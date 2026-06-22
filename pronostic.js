'use strict';
/* ═══════════════════════════════════════════════════════════════════
   WC 2026 — Pronostic & Leaderboard System  v1
   ═══════════════════════════════════════════════════════════════════ */

// ── CONSTANTS ─────────────────────────────────────────────────────────────
const ADMIN_PSEUDO = '_admin_';
const USERS_KEY    = 'wc2026_users';   // { pseudo: { pronostics, customSquad } }
const REAL_KEY     = 'wc2026_real';    // { scoreKey: { score, homeScorers, awayScorers, penalty, redCards } }
const SESSION_KEY  = 'wc2026_pseudo';  // current pseudo (string)
const REMOVED_PSEUDOS = new Set(['raph', 'Raph', 'Manu', 'Frred']);

// ── SESSION STATE ─────────────────────────────────────────────────────────
let currentPseudo = null;
let pronoIsAdmin  = false;

function isRemovedPseudo(pseudo) {
  return REMOVED_PSEUDOS.has(String(pseudo || '').trim());
}
window.isRemovedPseudo = isRemovedPseudo;

// ── STORAGE HELPERS ───────────────────────────────────────────────────────
function loadUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || {};
    let changed = false;
    Object.keys(users).forEach(pseudo => {
      if (isRemovedPseudo(pseudo)) {
        delete users[pseudo];
        changed = true;
      }
    });
    if (changed) localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return users;
  } catch { return {}; }
}
function saveUsers(u, skipCloud) {
  Object.keys(u || {}).forEach(pseudo => {
    if (isRemovedPseudo(pseudo)) delete u[pseudo];
  });
  localStorage.setItem(USERS_KEY, JSON.stringify(u));
  if (!skipCloud) cloudPushUser(currentPseudo);
}

// ── CLOUD SYNC (Supabase) ─────────────────────────────────────────────────
// Pronostics/avatars/sélections partagés entre appareils via une table
// publique `wc_users` (pseudo → data jsonb). Clé publishable, accès anon.
const SB_URL = 'https://cickkkfjotljaxjrpwex.supabase.co/rest/v1/wc_users';
const SB_KEY = 'sb_publishable_91Az_TMDv2IwztI2kT4CCw_FLQuDywh';
const SB_HEADERS = {
  'apikey': SB_KEY,
  'Authorization': 'Bearer ' + SB_KEY,
  'Content-Type': 'application/json',
};

// Fusion de deux maps de pronos : union, et pour chaque clé on garde le plus
// RÉCENT (ts le plus grand). Empêche un appareil aux données partielles/anciennes
// d'écraser des pronos plus récents (cause des points qui changeaient au login).
function _mergePronoMap(a = {}, b = {}) {
  const out = { ...a };
  Object.keys(b).forEach(k => {
    const cur = out[k], nxt = b[k];
    if (!cur || (nxt && (nxt.ts || 0) >= (cur.ts || 0))) out[k] = nxt;
  });
  return out;
}

// Fusionne l'objet utilisateur complet (pronos par ts, autres champs : non-vide récent gagne)
function _mergeUser(base = {}, other = {}) {
  return {
    ...base, ...other,
    pronostics: _mergePronoMap(base.pronostics, other.pronostics),
    pronos:     _mergePronoMap(base.pronos, other.pronos),
  };
}

let _sbPushTimer = null;
function cloudPushUser(pseudo) {
  if (!pseudo || isRemovedPseudo(pseudo)) return;
  clearTimeout(_sbPushTimer);
  _sbPushTimer = setTimeout(async () => {
    try {
      const users = loadUsers();
      if (!users[pseudo]) return;
      // Lire d'abord le cloud et fusionner par ts → on ne perd jamais les pronos
      // faits sur un autre appareil, même si le local est partiel.
      let merged = users[pseudo];
      try {
        const res = await fetch(`${SB_URL}?pseudo=eq.${encodeURIComponent(pseudo)}&select=data`, {
          headers: SB_HEADERS, signal: AbortSignal.timeout(8000),
        });
        if (res.ok) {
          const rows = await res.json();
          if (Array.isArray(rows) && rows[0]?.data) {
            merged = _mergeUser(rows[0].data, users[pseudo]);
            users[pseudo] = merged;
            saveUsers(users, true); // garde le local cohérent, sans re-pousser
          }
        }
      } catch {}
      await fetch(SB_URL + '?on_conflict=pseudo', {
        method: 'POST',
        headers: { ...SB_HEADERS, 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify([{ pseudo, data: merged, updated_at: new Date().toISOString() }]),
        signal: AbortSignal.timeout(8000),
      });
    } catch (e) { console.warn('[SYNC] push failed:', e.message); }
  }, 1200);
}

async function cloudPullAll() {
  try {
    const res = await fetch(SB_URL + '?select=pseudo,data', {
      headers: SB_HEADERS,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const rows = await res.json();
    if (!Array.isArray(rows)) return false;
    const users = loadUsers();
    rows.forEach(r => {
      if (!r.pseudo) return;
      if (isRemovedPseudo(r.pseudo)) {
        delete users[r.pseudo];
        return;
      }
      // fusion par ts pour tout le monde (y compris soi) → jamais de perte
      users[r.pseudo] = _mergeUser(users[r.pseudo] || {}, r.data || {});
    });
    saveUsers(users, true);
    // Si un utilisateur est connecté et a des pronos en local (clé `pronostics`
    // OU l'ancienne clé `pronos`), on les pousse automatiquement après chaque
    // pull — garantit que les pronos faits sur cet appareil montent dans le cloud.
    if (currentPseudo && !isRemovedPseudo(currentPseudo)) {
      const u = users[currentPseudo] || {};
      const nLocal = Object.keys(u.pronostics || {}).length + Object.keys(u.pronos || {}).length;
      if (nLocal > 0) {
        cloudPushUser(currentPseudo);
      }
    }
    return true;
  } catch (e) { console.warn('[SYNC] pull failed:', e.message); return false; }
}
// Forcer une synchro complète depuis le classement : pousse mes pronos locaux
// puis re-télécharge tout le monde et redessine le classement.
let _forceSyncing = false;
async function forceSyncPronos() {
  if (_forceSyncing) return;
  _forceSyncing = true;
  const btn = document.getElementById('ldb-sync-btn');
  if (btn) { btn.disabled = true; btn.dataset.lbl = btn.textContent; btn.textContent = '🔄 Synchro…'; }
  try {
    if (currentPseudo && !isRemovedPseudo(currentPseudo)) cloudPushUser(currentPseudo);
    const ok = await cloudPullAll();
    if (typeof renderLeaderboard === 'function') renderLeaderboard();
    _notify(ok ? '✅ Classement synchronisé' : '⚠️ Synchro échouée', ok ? 'success' : 'error');
  } catch (e) {
    _notify('⚠️ Synchro échouée', 'error');
  } finally {
    _forceSyncing = false;
    const b2 = document.getElementById('ldb-sync-btn');
    if (b2) { b2.disabled = false; b2.textContent = b2.dataset.lbl || '🔄 Synchroniser'; }
  }
}

function loadReal()  {
  try { return JSON.parse(localStorage.getItem(REAL_KEY)) || {}; } catch { return {}; }
}
function saveReal(r) { localStorage.setItem(REAL_KEY, JSON.stringify(r)); }

function _notify(msg, type) {
  if (typeof showNotification === 'function') showNotification(msg, type || 'success');
}

// ── PSEUDO MODAL (globally expected by index.html) ─────────────────────────
function openPseudoModal(titleText) {
  const modal = document.getElementById('pseudo-modal');
  const title = document.getElementById('pseudo-modal-title');
  const sub   = document.querySelector('.pseudo-modal-sub');
  const btn   = document.getElementById('pseudo-cancel-btn');
  if (!modal) return;
  if (title && titleText) title.textContent = titleText;
  if (currentPseudo) {
    if (btn) btn.style.display = '';
    if (sub) sub.textContent = 'Modifie ton pseudo ou ton avatar';
  } else {
    if (btn) btn.style.display = Object.keys(loadUsers()).length ? '' : 'none';
  }
  modal.classList.add('active');
  const inp = document.getElementById('pseudo-input');
  if (inp) {
    inp.value = currentPseudo || '';
    setTimeout(() => { inp.focus(); if (currentPseudo) inp.select(); }, 150);
  }
  setTimeout(() => _initAvatarModal(currentPseudo || ''), 50);
}

function closePseudoModal() {
  const modal = document.getElementById('pseudo-modal');
  if (modal) modal.classList.remove('active');
}

function validatePseudo(forceConfirm) {
  const inp = document.getElementById('pseudo-input');
  if (!inp) return;
  const val = inp.value.trim().slice(0, 20);
  if (!val) {
    inp.style.borderColor = '#ef4444';
    setTimeout(() => inp.style.borderColor = '', 1000);
    return;
  }
  if (isRemovedPseudo(val)) {
    inp.style.borderColor = '#ef4444';
    _notify('Ce pseudo a été supprimé.', 'error');
    setTimeout(() => inp.style.borderColor = '', 1000);
    return;
  }
  // If pseudo already taken by someone else and not confirmed yet — show warning
  const users = loadUsers();
  const takenByOther = users[val] && val !== currentPseudo;
  if (takenByOther && !forceConfirm) {
    _showPseudoConflict(val);
    return;
  }
  _clearPseudoConflict();
  _setPseudo(val);
  // Save avatar draft
  if (_avatarDraft.img || _avatarDraft.hue !== null) {
    const users = loadUsers();
    if (!users[val]) users[val] = {};
    users[val].avatar = { hue: _avatarDraft.hue, img: _avatarDraft.img };
    saveUsers(users);
    _updatePseudoIndicator();
  }
  closePseudoModal();
}

function _showPseudoConflict(val) {
  let box = document.getElementById('pseudo-conflict-box');
  if (!box) {
    box = document.createElement('div');
    box.id = 'pseudo-conflict-box';
    const card = document.querySelector('.pseudo-modal-card');
    const actions = card?.querySelector('.pseudo-modal-actions');
    if (actions) card.insertBefore(box, actions);
  }
  box.innerHTML = `
    <div class="pcb-inner">
      <div class="pcb-icon">⚠️</div>
      <div class="pcb-msg">Le pseudo <strong>${val}</strong> est déjà utilisé.<br>C'est bien toi ?</div>
      <div class="pcb-btns">
        <button class="pcb-btn pcb-btn-no" onclick="_clearPseudoConflict()">Non, changer</button>
        <button class="pcb-btn pcb-btn-yes" onclick="validatePseudo(true)">Oui, c'est moi</button>
      </div>
    </div>`;
  box.style.display = '';
}

function _clearPseudoConflict() {
  const box = document.getElementById('pseudo-conflict-box');
  if (box) box.style.display = 'none';
}

function _setPseudo(name) {
  if (isRemovedPseudo(name)) return;
  currentPseudo = name;
  pronoIsAdmin  = (name === ADMIN_PSEUDO);
  localStorage.setItem(SESSION_KEY, name);

  // Ensure user slot exists
  const users = loadUsers();
  if (!users[name]) users[name] = { pronostics: {} };

  // Restore this user's custom squad
  const csKey = 'wc2026_custom_squads';
  try {
    if (users[name].customSquad) {
      localStorage.setItem(csKey, JSON.stringify(users[name].customSquad));
      if (typeof loadCustomSquads === 'function') loadCustomSquads();
      if (typeof renderCustomSquad === 'function') renderCustomSquad();
    }
  } catch {}

  saveUsers(users);
  _updatePseudoIndicator();
  _refreshAfterAuth();

  // Récupère les pronos de ce pseudo depuis le cloud (autre appareil)
  cloudPullAll().then(ok => {
    if (ok) { _updatePseudoIndicator(); _refreshAfterAuth(); }
  });

  if (!pronoIsAdmin) _notify(`👋 Bienvenue ${name}!`);
  else _notify('🔧 Mode Admin activé', 'success');
}

// Re-render the active view so login/logout state shows without switching tabs
function _refreshAfterAuth() {
  const v = (typeof state !== 'undefined' && state) ? state.view : null;
  if (v === 'pronostics' && typeof renderPronostics === 'function') renderPronostics();
  if (v === 'classement' && typeof renderLeaderboard === 'function') renderLeaderboard();
  if (v === 'custom-squad' && typeof renderCustomSquad === 'function') renderCustomSquad();
}

function logoutPseudo() {
  if (currentPseudo) {
    // Save custom squad on logout
    const users = loadUsers();
    if (users[currentPseudo]) {
      const csKey = 'wc2026_custom_squads';
      try { users[currentPseudo].customSquad = JSON.parse(localStorage.getItem(csKey)) || {}; } catch {}
      saveUsers(users);
    }
  }
  currentPseudo = null;
  pronoIsAdmin  = false;
  localStorage.removeItem(SESSION_KEY);
  _updatePseudoIndicator();
  _refreshAfterAuth();
}

function _updatePseudoIndicator() {
  let html;
  if (!currentPseudo) {
    html = `<button class="nav-btn pni-login-btn" onclick="openPseudoModal()">👤 Connexion</button>`;
  } else {
    const badge = pronoIsAdmin ? '<span class="pni-admin-badge">ADMIN</span>' : '';
    const avHtml = typeof getAvatarHtml === 'function'
      ? getAvatarHtml(currentPseudo, loadUsers(), 24)
      : '';
    html = `<div class="pni-chip" onclick="openPseudoModal('Mon profil')" style="cursor:pointer" title="Modifier le profil">
      ${avHtml}
      <span class="pni-name">${currentPseudo}</span>${badge}
      <button class="pni-logout" onclick="event.stopPropagation();logoutPseudo()" title="Déconnexion">↩</button>
    </div>`;
  }
  ['pseudo-nav-indicator', 'pseudo-nav-indicator-mobile'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });
}

// ── SCORING ENGINE ─────────────────────────────────────────────────────────
function _getWinner(score) {
  if (!score || !score.includes('-')) return null;
  const [h, a] = score.split('-').map(s => parseInt(s.trim()));
  if (isNaN(h) || isNaN(a)) return null;
  return h > a ? 'H' : h < a ? 'A' : 'D';
}

// outcome '1'/'N'/'2' → winner 'H'/'D'/'A'
function _ocToWinner(oc) {
  return oc === '1' ? 'H' : oc === '2' ? 'A' : oc === 'N' ? 'D' : null;
}
// Winner predicted, from exact score OR simple 1/N/2 outcome
function _pronoWinner(prono) {
  return (prono && _getWinner(prono.score)) || (prono && _ocToWinner(prono.outcome)) || null;
}
// Display label for a prono: exact score if set, else the 1/N/2 pick
function _pronoLabel(prono, match) {
  if (!prono) return '—';
  if (prono.score) return prono.score;
  const oc = prono.outcome;
  if (oc === 'N') return 'Nul';
  if (oc === '1') return match ? match.h : '1';
  if (oc === '2') return match ? match.a : '2';
  return '—';
}

function scorePoints(prono, real) {
  // Valid prono = exact score OR a simple 1/N/2 outcome
  if (!prono || !real || !real.score || (!prono.score && !prono.outcome)) {
    return { total: 0, winner: 0, score: 0, scorers: 0, penalty: 0, redCards: 0 };
  }
  const pts = { winner: 0, score: 0, scorers: 0, penalty: 0, redCards: 0 };

  // 1pt: correct winner / draw (from exact score or 1/N/2 outcome)
  if (_pronoWinner(prono) && _pronoWinner(prono) === _getWinner(real.score)) pts.winner = 1;

  // 3pts: exact score (replaces winner bonus)
  if (prono.score === real.score) { pts.winner = 0; pts.score = 3; }

  // Scorers — compare par nom de famille normalisé (ESPN: "9' Julián Quiñones",
  // effectif app: "Julián QUIÑONES" → les deux donnent "quinones")
  const _scNorm = s => (s || '')
    .replace(/^\d+'(?:\+\d+')?\s*/, '')
    .replace(/\s*\((pen|csc)\)$/, '')
    .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .trim().split(' ').pop();
  const _realSrc = real.homeScorers
    ? { h: real.homeScorers, a: real.awayScorers }
    : { h: real.scorers?.home, a: real.scorers?.away };
  const realH = (_realSrc.h || []).map(_scNorm);
  const realA = (_realSrc.a || []).map(_scNorm);
  const proH  = (prono.homeScorers || []).map(_scNorm);
  const proA  = (prono.awayScorers || []).map(_scNorm);

  let fH = 0, fA = 0;
  proH.forEach(s => { const i = realH.indexOf(s); if (i !== -1) { fH++; realH.splice(i, 1); } });
  proA.forEach(s => { const i = realA.indexOf(s); if (i !== -1) { fA++; realA.splice(i, 1); } });

  const found = fH + fA;
  const totalProno = proH.length + proA.length;
  const totalReal  = (_realSrc.h || []).length + (_realSrc.a || []).length;

  if (found === totalReal && totalProno === totalReal && totalReal > 0) {
    pts.scorers = 5; // All correct: bonus
  } else {
    pts.scorers = found; // 1pt each
  }

  // +1pt penalty — UNIQUEMENT si l'utilisateur a prédit un penalty (true) et qu'il
  // y en a eu un. Les défauts (false) ne rapportent rien, sinon points gratuits.
  if (prono.penalty === true && real.penalty === true) pts.penalty = 1;

  // +1pt cartons rouges — uniquement si prédit >0 et compte exact (0 par défaut = rien)
  if (Number(prono.redCards) > 0 && Number(prono.redCards) === Number(real.redCards)) pts.redCards = 1;

  pts.total = pts.winner + pts.score + pts.scorers + pts.penalty + pts.redCards;
  return pts;
}

// Résultats effectifs : saisie admin + scores ESPN des matchs terminés
function _effectiveReal() {
  const real = { ...loadReal() };
  if (typeof state !== 'undefined' && state.scores) {
    Object.entries(state.scores).forEach(([key, score]) => {
      if (!score || real[key]) return;
      // un match en cours ne compte pas : ni via le statut API ('in'),
      // ni via l'horaire (cas liveInfo vide juste après un reload)
      const li = state.liveInfo ? state.liveInfo[key] : null;
      if (li && li.state === 'in') return;
      if (!li || !li.state) {
        const kp = key.split('_');
        const g = (typeof GROUPS !== 'undefined') ? GROUPS.find(x => x.id === kp[0]) : null;
        const m = g?.matches[parseInt(kp[1])];
        if (m && typeof matchLiveStatus === 'function' && matchLiveStatus(m) !== 'finished') return;
      }
      const sc = (state.scorers || {})[key] || {};
      const det = (state.matchDetails || {})[key] || {};
      const reds = (det.reds?.home?.length || 0) + (det.reds?.away?.length || 0);
      const allSc = [...(sc.home || []), ...(sc.away || [])];
      real[key] = {
        score,
        homeScorers: sc.home || [],
        awayScorers: sc.away || [],
        redCards: det.reds ? reds : undefined,
        // penalty réel déduit des buteurs ESPN "(pen)"
        penalty: allSc.length || det.reds ? allSc.some(n => /\(pen\)/.test(n)) : undefined,
      };
    });
  }
  return real;
}

function getUserStats(pseudo) {
  const users     = loadUsers();
  const real      = _effectiveReal();
  const pronostics = (users[pseudo] && users[pseudo].pronostics) || {};
  let total = 0, matchCount = 0, exactScores = 0, allScorers = 0;
  for (const [key, realMatch] of Object.entries(real)) {
    const prono = pronostics[key];
    if (prono) {
      const pts = scorePoints(prono, realMatch);
      total += pts.total;
      matchCount++;
      if (pts.score === 3) exactScores++;
      if (pts.scorers === 5) allScorers++;
    }
  }
  return { total, matchCount, exactScores, allScorers };
}

function getLeaderboard() {
  const users = loadUsers();
  return Object.keys(users)
    .filter(p => p !== ADMIN_PSEUDO && !isRemovedPseudo(p) && !/test/i.test(p))
    .map(pseudo => ({ pseudo, ...getUserStats(pseudo) }))
    .sort((a, b) => b.total - a.total || b.exactScores - a.exactScores || b.matchCount - a.matchCount);
}

// ── DÉTAIL DES POINTS D'UN PRONO (popup explicative) ───────────────────────
function openPronoDetail(pseudo, scoreKey) {
  const users = loadUsers();
  const prono = users[pseudo]?.pronostics?.[scoreKey] || users[pseudo]?.pronos?.[scoreKey];
  const [gid, idxS] = scoreKey.split('_');
  const g = (typeof GROUPS !== 'undefined') ? GROUPS.find(x => x.id === gid) : null;
  const m = g?.matches[parseInt(idxS)];
  if (!prono || !m) return;
  const real = _effectiveReal()[scoreKey] || null;
  const hInfo = g.teams.find(t => t.name === m.h);
  const aInfo = g.teams.find(t => t.name === m.a);
  const pronoLbl = _pronoLabel(prono, m);

  let bodyRows = '';
  let totalHtml = '';
  if (!real) {
    bodyRows = `<div class="pdt-row"><span class="pdt-ico">⏳</span><div class="pdt-txt"><b>Match pas encore joué</b><span>Les points seront calculés au coup de sifflet final</span></div><span class="pdt-pts pdt-pending">—</span></div>`;
  } else {
    const pts = scorePoints(prono, real);
    const row = (ok, ico, title, why, p) => `
      <div class="pdt-row ${ok ? 'pdt-ok' : 'pdt-ko'}">
        <span class="pdt-ico">${ico}</span>
        <div class="pdt-txt"><b>${title}</b><span>${why}</span></div>
        <span class="pdt-pts ${ok ? 'pdt-pts-ok' : ''}">${p}</span>
      </div>`;

    // Score exact / vainqueur
    if (pts.score > 0) {
      bodyRows += row(true, '🎯', 'Score exact', `Prono ${prono.score} = résultat ${real.score}`, '+3');
    } else {
      bodyRows += row(false, '🎯', 'Score exact', `Prono ${pronoLbl} ≠ résultat ${real.score}`, '0');
      const w = _getWinner(real.score);
      const wName = w === 'H' ? m.h : w === 'A' ? m.a : 'Match nul';
      bodyRows += pts.winner > 0
        ? row(true, '✅', 'Bon vainqueur', `Tu avais prévu la victoire ${w === 'D' ? '(nul)' : 'de ' + wName}`, '+1')
        : row(false, '❌', 'Vainqueur', `${w === 'D' ? 'Match nul' : 'Victoire de ' + wName} — pas ton choix`, '0');
    }

    // Buteurs
    const proSc = [...(prono.homeScorers || []), ...(prono.awayScorers || [])];
    if (proSc.length) {
      const realSc = [...(real.homeScorers || []), ...(real.awayScorers || [])]
        .map(n => n.replace(/^\d+'(?:\+\d+')?\s*/, ''));
      const why = pts.scorers >= 5
        ? `Tous les buteurs trouvés ! (${realSc.join(', ') || '—'})`
        : `${pts.scorers} bon${pts.scorers > 1 ? 's' : ''} buteur${pts.scorers > 1 ? 's' : ''} sur ${proSc.length} pronostiqué${proSc.length > 1 ? 's' : ''} · réels : ${realSc.join(', ') || 'aucun'}`;
      bodyRows += row(pts.scorers > 0, '⚽', 'Buteurs', why, pts.scorers > 0 ? '+' + pts.scorers : '0');
    }

    // Penalty / rouges seulement si pronostiqués
    // n'afficher penalty/rouges que si l'utilisateur les a réellement prédits
    if (prono.penalty === true) {
      bodyRows += row(pts.penalty > 0, '🥅', 'Penalty prédit', pts.penalty > 0 ? 'Il y a eu penalty' : 'Pas de penalty', pts.penalty > 0 ? '+1' : '0');
    }
    if (Number(prono.redCards) > 0) {
      bodyRows += row(pts.redCards > 0, '🟥', 'Cartons rouges', pts.redCards > 0 ? `Bon compte (${real.redCards})` : `Prédit ${prono.redCards} · réel ${real.redCards ?? '?'}`, pts.redCards > 0 ? '+1' : '0');
    }

    totalHtml = `<div class="pdt-total">Total <b>${pts.total} pt${pts.total > 1 ? 's' : ''}</b></div>`;
  }

  // Hero façon onglet Matchs : drapeaux ronds + score énorme + pilule d'état
  const flagEl = (info) => {
    const src = (typeof getFlagImg === 'function') ? getFlagImg(info?.code) : null;
    return src
      ? `<img class="mr-flag-img" src="${src}" alt="">`
      : `<span class="mr-flag-emoji">${info?.flag || '🏳️'}</span>`;
  };
  const scoreDisp = real?.score ? real.score.replace('-', ' – ') : null;
  const heroMid = scoreDisp
    ? `<div class="mr-score">${scoreDisp}</div><div class="mr-status">Terminé</div>`
    : `<div class="mr-time">${m.t}</div><div class="mr-status">${m.d}</div>`;

  const html = `
    <div class="pdt-wrap">
      <div class="mr-card pdt-hero">
        <div class="mr-team">${flagEl(hInfo)}<span class="mr-name">${m.h}</span></div>
        <div class="mr-mid">${heroMid}</div>
        <div class="mr-team">${flagEl(aInfo)}<span class="mr-name">${m.a}</span></div>
      </div>
      <div class="pdt-user">
        ${typeof getAvatarHtml === 'function' ? getAvatarHtml(pseudo, users, 44) : ''}
        <div class="pdt-user-txt">
          <div class="pdt-pseudo">${pseudo}</div>
          <div class="pdt-user-lbl">Son pronostic</div>
        </div>
        <div class="pdt-user-prono">${pronoLbl}</div>
      </div>
      ${bodyRows}
      ${totalHtml}
      <div class="pdt-bareme">Barème : score exact <b>+3</b> · bon vainqueur <b>+1</b> · buteur <b>+1</b> chacun (tous trouvés <b>+5</b>) · penalty <b>+1</b> · cartons rouges <b>+1</b></div>
      <button class="prono-submit-btn" style="margin-top:16px;width:100%" onclick="openPseudoPronos('${pseudo.replace(/'/g, "\\'")}')">Voir tous ses pronos</button>
    </div>`;

  if (typeof openPanel === 'function') openPanel(html, `Pronostic de ${pseudo}`);
}

// ── SAVE USER PRONOSTIC ────────────────────────────────────────────────────
function _savePronostic(scoreKey, data, silent) {
  if (!currentPseudo || pronoIsAdmin) return;
  const users = loadUsers();
  if (!users[currentPseudo]) users[currentPseudo] = { pronostics: {} };
  if (!users[currentPseudo].pronostics) users[currentPseudo].pronostics = {};
  const _prev = users[currentPseudo].pronostics[scoreKey] || {};
  const _merged = { ..._prev, ...data, ts: Date.now() };
  // Keep outcome consistent with exact score when one is set
  const _w = data.score ? _getWinner(data.score) : null;
  if (_w) _merged.outcome = _w === 'H' ? '1' : _w === 'A' ? '2' : 'N';
  users[currentPseudo].pronostics[scoreKey] = _merged;
  saveUsers(users); // → pousse aussi vers le cloud (cloudPushUser)
  if (!silent) {
    _notify('✅ Pronostic enregistré!');
    if (typeof renderCalendar === 'function') renderCalendar();
  }
}

// Auto-sauvegarde (silencieuse) à chaque modif du formulaire : dès qu'un score
// valide est saisi, le prono est enregistré ET poussé vers le cloud — même si
// l'utilisateur n'appuie jamais sur « Enregistrer » ou ferme l'app aussitôt.
let _autoSaveTimer = null;
function pronoAutoSave(scoreKey) {
  if (!currentPseudo || pronoIsAdmin) return;
  const hInput = document.getElementById('ph-' + scoreKey);
  const aInput = document.getElementById('pa-' + scoreKey);
  if (!hInput || !aInput || hInput.value === '' || aInput.value === '') return;
  const hVal = parseInt(hInput.value), aVal = parseInt(aInput.value);
  if (isNaN(hVal) || isNaN(aVal) || hVal < 0 || aVal < 0) return;
  const score = `${hVal}-${aVal}`;
  const homeScorers = _getSelectedNames('pr-hs-' + scoreKey).slice(0, hVal);
  const awayScorers = _getSelectedNames('pr-as-' + scoreKey).slice(0, aVal);
  const penalty  = document.getElementById('p-pen-' + scoreKey)?.checked || false;
  const redCards = parseInt(document.getElementById('p-rc-' + scoreKey)?.value) || 0;
  clearTimeout(_autoSaveTimer);
  _autoSaveTimer = setTimeout(() => {
    _savePronostic(scoreKey, { score, homeScorers, awayScorers, penalty, redCards }, true);
    const hint = document.querySelector('#prono-section-' + scoreKey + ' .prono-hint');
    if (hint) hint.innerHTML = `✏️ Enregistré automatiquement : <strong>${score}</strong>`;
  }, 600);
}

function _getUserProno(scoreKey) {
  if (!currentPseudo) return null;
  const users = loadUsers();
  return (users[currentPseudo] && users[currentPseudo].pronostics && users[currentPseudo].pronostics[scoreKey]) || null;
}

// ── ADMIN: SAVE REAL RESULT ────────────────────────────────────────────────
function saveRealResult(scoreKey, data) {
  if (!pronoIsAdmin) return;
  const real = loadReal();
  real[scoreKey] = { ...data, ts: Date.now() };
  saveReal(real);
  // Sync state.scores so calendar refreshes
  if (typeof state !== 'undefined' && data.score) {
    state.scores[scoreKey] = data.score;
    try { localStorage.setItem('wc2026_scores', JSON.stringify(state.scores)); } catch {}
  }
  _notify('✅ Résultat officiel enregistré!');
}

// ── PILL HELPERS ───────────────────────────────────────────────────────────
function _buildPills(containerId, players, selected, maxInputId, isAdminMode) {
  return players.map(p => {
    const short = p.name.split(' ').pop();
    const on    = selected.includes(p.name) ? 'prono-pill-on' : '';
    return `<button class="prono-pill ${on}"
      data-cid="${containerId}"
      data-fullname="${p.name.replace(/"/g, '&quot;')}"
      data-maxinput="${maxInputId}"
      data-admin="${isAdminMode ? '1' : '0'}"
      onclick="handlePronoPill(this)">${short}</button>`;
  }).join('');
}

// Global pill click handler (event delegation friendly, can also be called directly)
function handlePronoPill(btn) {
  const isAdminMode = btn.dataset.admin === '1';
  if (!isAdminMode) {
    const maxInput = document.getElementById(btn.dataset.maxinput);
    const max = maxInput ? parseInt(maxInput.value) || 0 : 0;
    if (max === 0) { _notify('Entrez d\'abord le score prédit', 'warning'); return; }
    const container = document.getElementById(btn.dataset.cid);
    const current   = container ? container.querySelectorAll('.prono-pill-on').length : 0;
    if (!btn.classList.contains('prono-pill-on') && current >= max) {
      _notify(`Max ${max} buteur${max > 1 ? 's' : ''} pour cette équipe`, 'warning');
      return;
    }
  }
  btn.classList.toggle('prono-pill-on');
  // Auto-save (buteurs) côté utilisateur
  if (!isAdminMode) {
    const sk = (btn.dataset.cid || '').replace(/^pr-(hs|as)-/, '');
    if (sk) pronoAutoSave(sk);
  }
}

function _getSelectedNames(containerId) {
  const c = document.getElementById(containerId);
  if (!c) return [];
  return Array.from(c.querySelectorAll('.prono-pill-on')).map(b => b.dataset.fullname);
}

// Called when score inputs change → rebuild scorer rows
function updatePronoScorers(scoreKey) {
  const container = document.getElementById('prono-scorers-' + scoreKey);
  if (!container) return;
  const key = scoreKey;
  const group = GROUPS.find(g => g.matches.some((_, i) => g.id + '_' + i === key));
  if (!group) return;
  const mIdx = parseInt(key.split('_')[1]);
  const m    = group.matches[mIdx];
  if (!m) return;

  const hPool = (typeof ORIGINAL_LINEUPS !== 'undefined' && ORIGINAL_LINEUPS[m.h]) || (TEAMS[m.h] ? TEAMS[m.h].players : []);
  const aPool = (typeof ORIGINAL_LINEUPS !== 'undefined' && ORIGINAL_LINEUPS[m.a]) || (TEAMS[m.a] ? TEAMS[m.a].players : []);
  const hPlayers = hPool.filter(p => p.role === 'Titulaire');
  const aPlayers = aPool.filter(p => p.role === 'Titulaire');

  const hVal = parseInt(document.getElementById('ph-' + key)?.value) || 0;
  const aVal = parseInt(document.getElementById('pa-' + key)?.value) || 0;

  const savedProno = _getUserProno(key) || {};

  container.innerHTML = _buildScorersBlock(key, hPlayers, aPlayers, hVal, aVal,
    savedProno.homeScorers || [], savedProno.awayScorers || [], false);
}

function _buildScorersBlock(key, hPlayers, aPlayers, hVal, aVal, savedH, savedA, isAdm) {
  let html = '';
  const prefix = isAdm ? 'ad' : 'pr';
  if (hVal > 0 || isAdm) {
    const cid = `${prefix}-hs-${key}`;
    html += `<div class="prono-scorer-row">
      <div class="prono-scorer-label">Buteurs Dom.${hVal > 0 && !isAdm ? ` (max ${hVal})` : ''}</div>
      <div class="prono-pills" id="${cid}">${_buildPills(cid, hPlayers, savedH, `${prefix === 'ad' ? 'ah' : 'ph'}-${key}`, isAdm)}</div>
    </div>`;
  }
  if (aVal > 0 || isAdm) {
    const cid = `${prefix}-as-${key}`;
    html += `<div class="prono-scorer-row">
      <div class="prono-scorer-label">Buteurs Ext.${aVal > 0 && !isAdm ? ` (max ${aVal})` : ''}</div>
      <div class="prono-pills" id="${cid}">${_buildPills(cid, aPlayers, savedA, `${prefix === 'ad' ? 'aa' : 'pa'}-${key}`, isAdm)}</div>
    </div>`;
  }
  return html;
}

// ── SUBMIT PRONOSTIC ──────────────────────────────────────────────────────
function submitProno(scoreKey) {
  if (!currentPseudo || pronoIsAdmin) return;
  const hInput = document.getElementById('ph-' + scoreKey);
  const aInput = document.getElementById('pa-' + scoreKey);
  if (!hInput || !aInput || hInput.value === '' || aInput.value === '') {
    _notify('Entrez votre score prédit', 'warning'); return;
  }
  const hVal = parseInt(hInput.value);
  const aVal = parseInt(aInput.value);
  if (isNaN(hVal) || isNaN(aVal) || hVal < 0 || aVal < 0) {
    _notify('Score invalide', 'warning'); return;
  }
  const score = `${hVal}-${aVal}`;
  const homeScorers = _getSelectedNames('pr-hs-' + scoreKey);
  const awayScorers = _getSelectedNames('pr-as-' + scoreKey);
  if (homeScorers.length > hVal || awayScorers.length > aVal) {
    _notify('Trop de buteurs sélectionnés', 'warning'); return;
  }
  const penalty  = document.getElementById('p-pen-' + scoreKey)?.checked || false;
  const redCards = parseInt(document.getElementById('p-rc-' + scoreKey)?.value) || 0;
  _savePronostic(scoreKey, { score, homeScorers, awayScorers, penalty, redCards });

  // Refresh the section
  const section = document.getElementById('prono-section-' + scoreKey);
  if (section) {
    const group = GROUPS.find(g => g.matches.some((_, i) => g.id + '_' + i === scoreKey));
    if (group) {
      const mIdx = parseInt(scoreKey.split('_')[1]);
      const m    = group.matches[mIdx];
      const realScore = (typeof state !== 'undefined' && state.scores[scoreKey]) || m.s;
      const hPool = (typeof ORIGINAL_LINEUPS !== 'undefined' && ORIGINAL_LINEUPS[m.h]) || (TEAMS[m.h]?.players || []);
      const aPool = (typeof ORIGINAL_LINEUPS !== 'undefined' && ORIGINAL_LINEUPS[m.a]) || (TEAMS[m.a]?.players || []);
      section.outerHTML = getPronoSection(scoreKey, m.h, m.a, hPool, aPool, realScore);
    }
  }
}

// ── SUBMIT ADMIN RESULT ────────────────────────────────────────────────────
function submitAdminResult(scoreKey) {
  if (!pronoIsAdmin) return;
  const hInput = document.getElementById('ah-' + scoreKey);
  const aInput = document.getElementById('aa-' + scoreKey);
  if (!hInput || !aInput || hInput.value === '' || aInput.value === '') {
    _notify('Entrez le score réel', 'warning'); return;
  }
  const hVal = parseInt(hInput.value);
  const aVal = parseInt(aInput.value);
  if (isNaN(hVal) || isNaN(aVal)) { _notify('Score invalide', 'warning'); return; }
  const score = `${hVal}-${aVal}`;
  const homeScorers = _getSelectedNames('ad-hs-' + scoreKey);
  const awayScorers = _getSelectedNames('ad-as-' + scoreKey);
  const penalty  = document.getElementById('a-pen-' + scoreKey)?.checked || false;
  const redCards = parseInt(document.getElementById('a-rc-' + scoreKey)?.value) || 0;
  saveRealResult(scoreKey, { score, homeScorers, awayScorers, penalty, redCards });

  // Refresh section
  const section = document.getElementById('prono-section-' + scoreKey);
  if (section) {
    const group = GROUPS.find(g => g.matches.some((_, i) => g.id + '_' + i === scoreKey));
    if (group) {
      const mIdx = parseInt(scoreKey.split('_')[1]);
      const m    = group.matches[mIdx];
      const hPool = (typeof ORIGINAL_LINEUPS !== 'undefined' && ORIGINAL_LINEUPS[m.h]) || (TEAMS[m.h]?.players || []);
      const aPool = (typeof ORIGINAL_LINEUPS !== 'undefined' && ORIGINAL_LINEUPS[m.a]) || (TEAMS[m.a]?.players || []);
      section.outerHTML = getPronoSection(scoreKey, m.h, m.a, hPool, aPool, score);
    }
  }
}

// ── PRONOSTIC SECTION HTML (injected into match panel) ─────────────────────
function getPronoSection(scoreKey, homeTeam, awayTeam, hPool, aPool, realScore) {
  const hPlayers = hPool.filter(p => p.role === 'Titulaire');
  const aPlayers = aPool.filter(p => p.role === 'Titulaire');
  const isPlayed = !!realScore;
  const realData = loadReal()[scoreKey] || null;
  const userProno = _getUserProno(scoreKey);
  const userPts   = (userProno && realData) ? scorePoints(userProno, realData) : null;

  let inner = '';

  // ── ADMIN BLOCK ───
  if (pronoIsAdmin) {
    const rd  = realData || {};
    const rds = rd.score ? rd.score.split('-') : ['', ''];
    inner += `
    <div class="prono-block prono-admin-block">
      <div class="prono-block-title">⚙️ Résultat officiel</div>
      <div class="prono-score-row">
        <span class="prono-team-lbl">${homeTeam}</span>
        <input type="number" id="ah-${scoreKey}" class="prono-score-inp" min="0" max="30" value="${rds[0]}" placeholder="0">
        <span class="prono-sep">–</span>
        <input type="number" id="aa-${scoreKey}" class="prono-score-inp" min="0" max="30" value="${rds[1]}" placeholder="0">
        <span class="prono-team-lbl">${awayTeam}</span>
      </div>
      <div id="adm-scorers-${scoreKey}">
        ${_buildScorersBlock(scoreKey, hPlayers, aPlayers, 99, 99,
          rd.homeScorers || [], rd.awayScorers || [], true)}
      </div>
      <div class="prono-extras">
        <label class="prono-extra-lbl"><input type="checkbox" id="a-pen-${scoreKey}" ${rd.penalty ? 'checked' : ''}> 🫵 Penalty</label>
        <label class="prono-extra-lbl">🟥 Cartons: <input type="number" id="a-rc-${scoreKey}" class="prono-rc-inp" min="0" max="10" value="${rd.redCards || 0}"></label>
      </div>
      <button class="prono-submit-btn prono-admin-btn" onclick="submitAdminResult('${scoreKey}')">
        💾 Enregistrer le résultat officiel
      </button>
    </div>`;
  }

  // ── USER BLOCK ───
  if (currentPseudo && !pronoIsAdmin) {
    if (isPlayed && userProno && userPts) {
      // Show result
      const medal = userPts.total >= 9 ? '🏆' : userPts.total >= 5 ? '⭐' : userPts.total >= 3 ? '✅' : userPts.total >= 1 ? '👍' : '😔';
      inner += `
      <div class="prono-block prono-result-block">
        <div class="prono-block-title">Ton pronostic ${medal}</div>
        <div class="prono-result-row">
          <div class="prono-result-left">
            <div class="prono-result-score">${userProno.score || '—'}</div>
            ${userProno.homeScorers?.length ? `<div class="prono-result-scorers">⚽ ${userProno.homeScorers.join(', ')}</div>` : ''}
            ${userProno.awayScorers?.length ? `<div class="prono-result-scorers">⚽ ${userProno.awayScorers.join(', ')}</div>` : ''}
            ${userProno.penalty ? '<div class="prono-result-extra">🫵 Penalty prévu</div>' : ''}
            ${userProno.redCards > 0 ? `<div class="prono-result-extra">🟥 ${userProno.redCards} carton${userProno.redCards > 1 ? 's' : ''}</div>` : ''}
          </div>
          <div class="prono-result-pts">
            <div class="prono-pts-big">${userPts.total}</div>
            <div class="prono-pts-sub">points</div>
          </div>
        </div>
        <div class="prono-chips">
          ${userPts.winner  ? `<span class="prono-chip">🎯 Vainqueur +${userPts.winner}</span>` : ''}
          ${userPts.score   ? `<span class="prono-chip prono-chip-gold">🎯 Score exact +${userPts.score}</span>` : ''}
          ${userPts.scorers ? `<span class="prono-chip${userPts.scorers === 5 ? ' prono-chip-gold' : ''}">${userPts.scorers === 5 ? '🏆' : '⚽'} Buteurs +${userPts.scorers}</span>` : ''}
          ${userPts.penalty ? `<span class="prono-chip">🫵 Penalty +1</span>` : ''}
          ${userPts.redCards? `<span class="prono-chip">🟥 Cartons +1</span>` : ''}
          ${userPts.total === 0 ? `<span style="font-size:0.75rem;color:var(--text-4)">Pas de point cette fois...</span>` : ''}
        </div>
      </div>`;
    } else if (isPlayed && !userProno) {
      inner += `<div class="prono-block prono-missed">😔 Tu n'avais pas pronostiqué ce match</div>`;
    } else if (!isPlayed) {
      // Input form
      const up  = userProno || {};
      const [upH, upA] = (up.score || '').split('-');
      const initHVal = upH !== undefined ? parseInt(upH) : '';
      const initAVal = upA !== undefined ? parseInt(upA) : '';
      const initHNum = isNaN(initHVal) ? '' : initHVal;
      const initANum = isNaN(initAVal) ? '' : initAVal;
      inner += `
      <div class="prono-block prono-form-block">
        <div class="prono-block-title">Ton pronostic</div>
        <div class="prono-score-row">
          <span class="prono-team-lbl">${homeTeam}</span>
          <input type="number" id="ph-${scoreKey}" class="prono-score-inp" min="0" max="30"
            value="${initHNum}" placeholder="0" oninput="updatePronoScorers('${scoreKey}');pronoAutoSave('${scoreKey}')">
          <span class="prono-sep">–</span>
          <input type="number" id="pa-${scoreKey}" class="prono-score-inp" min="0" max="30"
            value="${initANum}" placeholder="0" oninput="updatePronoScorers('${scoreKey}');pronoAutoSave('${scoreKey}')">
          <span class="prono-team-lbl">${awayTeam}</span>
        </div>
        <div id="prono-scorers-${scoreKey}">
          ${_buildScorersBlock(scoreKey, hPlayers, aPlayers,
            isNaN(initHVal) ? 0 : initHVal,
            isNaN(initAVal) ? 0 : initAVal,
            up.homeScorers || [], up.awayScorers || [], false)}
        </div>
        <div class="prono-extras">
          <label class="prono-extra-lbl">
            <input type="checkbox" id="p-pen-${scoreKey}" ${up.penalty ? 'checked' : ''} onchange="pronoAutoSave('${scoreKey}')"> 🫵 Penalty prévu
          </label>
          <label class="prono-extra-lbl">
            🟥 Cartons rouges:
            <input type="number" id="p-rc-${scoreKey}" class="prono-rc-inp" min="0" max="10" value="${up.redCards || 0}" oninput="pronoAutoSave('${scoreKey}')">
          </label>
        </div>
        <div class="prono-hint">
          ${up.score ? `✏️ Pronostic enregistré : <strong>${up.score}</strong>` : '⏳ Match non joué — pronostique avant le coup d\'envoi!'}
        </div>
        <button class="prono-submit-btn" onclick="submitProno('${scoreKey}')">
          ${up.score ? '✏️ Modifier mon pronostic' : '💾 Enregistrer mon pronostic'}
        </button>
      </div>`;
    }
  } else if (!currentPseudo) {
    inner += `
    <div class="prono-block prono-cta">
      <div class="prono-cta-icon">📊</div>
      <div class="prono-cta-title">Pronostique ce match!</div>
      <div class="prono-cta-sub">Connecte-toi pour rejoindre le classement et tenter de gagner 10 points</div>
      <div class="prono-cta-pts">
        <span class="prono-cta-pt">🎯 1pt si tu trouves le vainqueur</span>
        <span class="prono-cta-pt">🎯 3pts si le score est exact</span>
        <span class="prono-cta-pt">⚽ 1–5pts par buteur</span>
        <span class="prono-cta-pt">🫵 +1pt penalty · 🟥 +1pt cartons</span>
      </div>
      <button class="prono-submit-btn" onclick="openPseudoModal()">👤 Se connecter</button>
    </div>`;
  }

  return `<div class="prono-section" id="prono-section-${scoreKey}">${inner}</div>`;
}

// ── LEADERBOARD ────────────────────────────────────────────────────────────
function renderLeaderboard() {
  const container = document.getElementById('leaderboard-content');
  if (!container) return;

  const board   = getLeaderboard();
  const real    = _effectiveReal();
  const maxPts  = board.length ? Math.max(...board.map(e => e.total), 1) : 1;
  const medals  = ['🥇', '🥈', '🥉'];

  if (board.length === 0) {
    container.innerHTML = `
    <div class="ldb-empty">
      <div style="font-size:3.5rem;margin-bottom:18px">🏆</div>
      <div class="ldb-empty-title">Le classement est vide</div>
      <div class="ldb-empty-sub">Connecte-toi et pronostique tes premiers matchs!</div>
      <button class="prono-submit-btn" onclick="openPseudoModal()" style="margin-top:20px">👤 Se connecter</button>
    </div>`;
    return;
  }

  const myRank = currentPseudo ? board.findIndex(e => e.pseudo === currentPseudo) + 1 : 0;

  container.innerHTML = `
  <div class="ldb-wrap">
    <div class="ldb-hero">
      <div class="ldb-hero-title">CLASSEMENT</div>
      <div class="ldb-hero-sub">${board.length} joueur${board.length > 1 ? 's' : ''} · ${Object.keys(real).length} match${Object.keys(real).length > 1 ? 's' : ''} joué${Object.keys(real).length > 1 ? 's' : ''}</div>
      ${myRank ? `<div class="ldb-my-rank">Ta position : <strong>#${myRank}</strong></div>` : ''}
      <button id="ldb-sync-btn" class="ldb-sync-btn" onclick="forceSyncPronos()">🔄 Synchroniser</button>
    </div>

    <div class="ldb-list">
      ${board.map((entry, i) => {
        const isMe = entry.pseudo === currentPseudo;
        const barW = Math.round(entry.total / maxPts * 100);
        const safeP = entry.pseudo.replace(/'/g, "\\'");
        return `
        <div class="ldb-card ${i === 0 ? 'ldb-gold' : i === 1 ? 'ldb-silver' : i === 2 ? 'ldb-bronze' : ''} ${isMe ? 'ldb-me' : ''}"
             style="animation-delay:${i * 0.06}s" onclick="ldbTogglePronos(this,'${safeP}')">
          <div class="ldb-rank-num">${medals[i] || `<span style="font-size:0.9rem;font-weight:900">${i + 1}</span>`}</div>
          ${getAvatarHtml(entry.pseudo, loadUsers(), 36)}
          <div class="ldb-body">
            <div class="ldb-top">
              <span class="ldb-pseudo">${entry.pseudo}</span>
              <span class="ldb-pts-main">${entry.total} <span class="ldb-pts-unit">pts</span></span>
              <span class="ldb-expand-arrow">›</span>
            </div>
            <div class="ldb-meta">${entry.matchCount} pronostic${entry.matchCount > 1 ? 's' : ''} · ${entry.exactScores} score${entry.exactScores > 1 ? 's' : ''} exact${entry.exactScores > 1 ? 's' : ''}</div>
            <div class="ldb-bar">
              <div class="ldb-bar-inner" data-w="${barW}" style="width:0%"></div>
            </div>
            <div class="ldb-pronos-drawer"></div>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;

  // Animation des barres uniquement. Le nombre de points est rendu directement
  // dans l'HTML (= total exact) : pas d'animation de compteur qui se désynchronise.
  requestAnimationFrame(() => {
    setTimeout(() => {
      container.querySelectorAll('.ldb-bar-inner').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }, 100);
  });
}

function ldbTogglePronos(card, pseudo) {
  const drawer = card.querySelector('.ldb-pronos-drawer');
  const arrow  = card.querySelector('.ldb-expand-arrow');
  const isOpen = card.classList.contains('ldb-open');
  if (isOpen) {
    card.classList.remove('ldb-open');
    arrow.style.transform = '';
    drawer.innerHTML = '';
    drawer.style.maxHeight = '0';
    return;
  }
  card.classList.add('ldb-open');
  arrow.style.transform = 'rotate(90deg)';
  drawer.innerHTML = _renderPronosForUser(pseudo);
  drawer.style.maxHeight = drawer.scrollHeight + 'px';
  // libère la hauteur après l'animation pour laisser les détails se déplier
  setTimeout(() => { if (card.classList.contains('ldb-open')) drawer.style.maxHeight = 'none'; }, 400);
}

// Déplie/replie le détail d'un prono (score réel, buteurs, cartons)
function ldbToggleDetail(row) {
  const detail = row.nextElementSibling;
  if (!detail || !detail.classList.contains('ldb-pd-detail')) return;
  const open = detail.style.display !== 'none';
  detail.style.display = open ? 'none' : '';
  row.classList.toggle('ldb-pd-row--open', !open);
}

function _renderPronosForUser(pseudo) {
  const users = loadUsers();
  const real  = _effectiveReal();
  const u     = users[pseudo];
  const pronos = { ...(u?.pronos || {}), ...(u?.pronostics || {}) };
  const entries = Object.entries(pronos);
  if (!entries.length) return '<div class="ldb-pd-empty">Aucun pronostic</div>';

  // tri : ordre chronologique des matchs (date/heure réelle)
  const _matchTime = (key) => {
    const gId = key.split('_')[0];
    const mIdx = parseInt(key.split('_')[1]);
    const m = GROUPS.find(g => g.id === gId)?.matches[mIdx];
    return m?.utc ? Date.parse(m.utc) : Infinity;
  };
  entries.sort(([ka], [kb]) => _matchTime(ka) - _matchTime(kb));

  return `<div class="ldb-pd-list">${entries.map(([key, prono]) => {
    const gId  = key.split('_')[0];
    const mIdx = parseInt(key.split('_')[1]);
    const group = GROUPS.find(g => g.id === gId);
    const match = group?.matches[mIdx];
    if (!match) return '';
    const hInfo = group.teams.find(t => t.name === match.h);
    const aInfo = group.teams.find(t => t.name === match.a);

    const liveScore = (typeof state !== 'undefined' && state.scores) ? state.scores[key] : null;
    const realObj = real[key] || null;
    const realScore = realObj?.score || null;
    const inProgress = !realScore && liveScore;
    const pts = realObj ? scorePoints(prono, realObj) : null;

    // statut + couleur des points
    let badge, badgeCls;
    if (pts) {
      badge = '+' + pts.total + ' pt' + (pts.total > 1 ? 's' : '');
      badgeCls = pts.score === 3 ? 'ldb-b-exact' : pts.total > 0 ? 'ldb-b-good' : 'ldb-b-miss';
    } else if (inProgress) {
      badge = 'en direct'; badgeCls = 'ldb-b-live';
    } else {
      badge = 'à jouer'; badgeCls = 'ldb-b-pending';
    }

    const resultStr = realScore || (inProgress ? liveScore : null);

    // détail : ce qui a rapporté, comme la popup openPronoDetail mais inline
    let detailHtml = '';
    if (pts) {
      const rows = [];
      if (pts.score === 3) rows.push(['Score exact', '+3', true]);
      else if (pts.winner) rows.push(['Bon vainqueur', '+1', true]);
      else rows.push(['Vainqueur', '0', false]);
      if (pts.scorers > 0) rows.push([pts.scorers >= 5 ? 'Tous les buteurs' : (pts.scorers + ' buteur' + (pts.scorers > 1 ? 's' : '')), '+' + pts.scorers, true]);
      if (pts.penalty) rows.push(['Penalty', '+1', true]);
      if (pts.redCards) rows.push(['Cartons rouges', '+1', true]);
      detailHtml = rows.map(([l, p, ok]) =>
        `<div class="ldb-dl ${ok ? 'ok' : ''}"><span>${l}</span><b>${p}</b></div>`).join('');
    } else {
      detailHtml = `<div class="ldb-dl"><span>${match.d} · ${match.t}</span><b></b></div>`;
    }

    return `<div class="ldb-pd-item">
      <div class="ldb-pd-card" onclick="event.stopPropagation();ldbToggleDetail(this)">
        <div class="ldb-pd-teams">
          <span class="ldb-pd-fl">${hInfo?.flag || ''}</span>
          <span class="ldb-pd-cd">${hInfo?.code || match.h}</span>
          <span class="ldb-pd-vs">${resultStr ? resultStr.replace('-', ' - ') : 'v'}</span>
          <span class="ldb-pd-cd">${aInfo?.code || match.a}</span>
          <span class="ldb-pd-fl">${aInfo?.flag || ''}</span>
        </div>
        <div class="ldb-pd-foot">
          <span class="ldb-pd-prono">Prono <b>${_pronoLabel(prono, match)}</b></span>
          <span class="ldb-pd-badge ${badgeCls}">${badge}</span>
        </div>
      </div>
      <div class="ldb-pd-detail" style="display:none">${detailHtml}</div>
    </div>`;
  }).join('')}</div>`;
}

function _renderUserHistory() {
  const users      = loadUsers();
  const real       = loadReal();
  const pronostics = (users[currentPseudo] && users[currentPseudo].pronostics) || {};
  const entries    = Object.entries(pronostics);

  if (!entries.length) {
    return '<div class="ldb-mh-empty">Aucun pronostic enregistré</div>';
  }

  return `<div class="ldb-mh-list">` + entries.map(([key, prono]) => {
    const realMatch = real[key];
    const pts = realMatch ? scorePoints(prono, realMatch) : null;
    const gId = key.split('_')[0];
    const mIdx = parseInt(key.split('_')[1]);
    const group = GROUPS.find(g => g.id === gId);
    const match = group?.matches[mIdx];
    const label = match ? `${match.h} vs ${match.a}` : key;
    const ptsDisplay = pts
      ? `<span class="ldb-mh-pts ${pts.total > 0 ? 'has' : ''}">${pts.total}pts</span>`
      : `<span class="ldb-mh-pts pending">en attente</span>`;
    return `<div class="ldb-mh-row">
      <span class="ldb-mh-match">${label}</span>
      <span class="ldb-mh-score">${prono.score || '—'}</span>
      ${ptsDisplay}
    </div>`;
  }).join('') + `</div>`;
}

// ── INIT ──────────────────────────────────────────────────────────────────
(function initPronosticSystem() {
  const saved = localStorage.getItem(SESSION_KEY);
  if (saved && isRemovedPseudo(saved)) {
    localStorage.removeItem(SESSION_KEY);
  } else if (saved) {
    currentPseudo = saved;
    pronoIsAdmin  = (saved === ADMIN_PSEUDO);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _onReady);
  } else {
    _onReady();
  }

  function _onReady() {
    _updatePseudoIndicator();

    // Sync cloud au démarrage (pronos + classement multi-appareils)
    cloudPullAll().then(ok => {
      if (ok) {
        _updatePseudoIndicator();
        _refreshAfterAuth();
      }
    });

    // Polling automatique toutes les 60 s pour voir les paris des autres en temps réel
    setInterval(() => {
      cloudPullAll().then(ok => {
        if (ok) {
          _updatePseudoIndicator();
          _refreshAfterAuth();
        }
      });
    }, 60_000);

    // If no pseudo after splash (4.5s), show modal once
    if (!currentPseudo) {
      setTimeout(() => {
        const m = document.getElementById('pseudo-modal');
        if (m && !m.classList.contains('active')) m.classList.add('active');
      }, 4500);
    }

    // Leaderboard auto-render when tab activated
    document.querySelectorAll('.nav-link[data-view="classement"]').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(renderLeaderboard, 50);
      });
    });

    // Avatar swatches injection
    const swatchContainer = document.getElementById('avc-swatches');
    if (swatchContainer) {
      [0, 25, 50, 120, 170, 210, 260, 290, 320, 350].forEach(hue => {
        const s = document.createElement('div');
        s.className = 'avc-swatch';
        s.dataset.hue = hue;
        s.style.background = `linear-gradient(135deg,hsl(${hue},70%,45%),hsl(${hue+40},80%,35%))`;
        s.onclick = () => selectAvatarHue(hue);
        swatchContainer.appendChild(s);
      });
    }

    // Live-update avatar preview as user types pseudo
    const pseudoInp = document.getElementById('pseudo-input');
    if (pseudoInp) pseudoInp.addEventListener('input', () => _updateAvatarPreview());
  }
})();

// ── AVATAR SYSTEM ────────────────────────────────────────────────────────────
let _avatarDraft = { hue: null, img: null };

function getAvatarHtml(pseudo, users, size) {
  const sz = size || 28;
  const u = users[pseudo] || {};
  const av = u.avatar || {};
  if (av.img) {
    return `<div class="pcard-avatar" style="width:${sz}px;height:${sz}px;background:none;overflow:hidden"><img src="${av.img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div>`;
  }
  const allP = Object.keys(users).filter(p => p !== '_admin_');
  const p2 = pseudo.slice(0,2).toUpperCase();
  const collision = allP.some(p => p !== pseudo && p.slice(0,2).toUpperCase() === p2);
  const initials = collision ? pseudo.slice(0,3).toUpperCase() : p2;
  const hue = av.hue !== undefined ? av.hue : pseudoHue(pseudo);
  return `<div class="pcard-avatar" style="background:linear-gradient(135deg,hsl(${hue},70%,45%),hsl(${hue+40},80%,35%));width:${sz}px;height:${sz}px">${initials}</div>`;
}

function _initAvatarModal(pseudo) {
  const users = loadUsers();
  const av = (users[pseudo] || {}).avatar || {};
  _avatarDraft = { hue: av.hue !== undefined ? av.hue : null, img: av.img || null };
  _updateAvatarPreview(pseudo || '');
  _syncSwatchSelection();
}

function _updateAvatarPreview(forceNameOverride) {
  const preview = document.getElementById('avc-preview');
  if (!preview) return;
  const name = forceNameOverride !== undefined
    ? forceNameOverride
    : (document.getElementById('pseudo-input')?.value.trim() || currentPseudo || '?');
  if (_avatarDraft.img) {
    preview.style.cssText = 'background:none';
    preview.innerHTML = `<img src="${_avatarDraft.img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
  } else {
    const hue = _avatarDraft.hue !== null ? _avatarDraft.hue : pseudoHue(name);
    preview.style.cssText = `background:linear-gradient(135deg,hsl(${hue},70%,45%),hsl(${hue+40},80%,35%))`;
    preview.textContent = name.slice(0,2).toUpperCase() || '??';
  }
  const removeBtn = document.getElementById('avc-remove-photo');
  if (removeBtn) removeBtn.style.display = _avatarDraft.img ? '' : 'none';
}

function _syncSwatchSelection() {
  document.querySelectorAll('.avc-swatch').forEach(s => {
    s.classList.toggle('selected', parseInt(s.dataset.hue) === _avatarDraft.hue);
  });
}

function selectAvatarHue(hue) {
  _avatarDraft = { hue, img: null };
  _updateAvatarPreview();
  _syncSwatchSelection();
}

function handleAvatarPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 80; canvas.height = 80;
      const ctx = canvas.getContext('2d');
      const sz = Math.min(img.width, img.height);
      ctx.drawImage(img, (img.width-sz)/2, (img.height-sz)/2, sz, sz, 0, 0, 80, 80);
      _avatarDraft = { hue: null, img: canvas.toDataURL('image/jpeg', 0.75) };
      _updateAvatarPreview();
      _syncSwatchSelection();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function removeAvatarPhoto() {
  _avatarDraft.img = null;
  _updateAvatarPreview();
  _syncSwatchSelection();
}
