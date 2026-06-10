'use strict';
/* ═══════════════════════════════════════════════════════════════════
   WC 2026 — Pronostic & Leaderboard System  v1
   ═══════════════════════════════════════════════════════════════════ */

// ── CONSTANTS ─────────────────────────────────────────────────────────────
const ADMIN_PSEUDO = '_admin_';
const USERS_KEY    = 'wc2026_users';   // { pseudo: { pronostics, customSquad } }
const REAL_KEY     = 'wc2026_real';    // { scoreKey: { score, homeScorers, awayScorers, penalty, redCards } }
const SESSION_KEY  = 'wc2026_pseudo';  // current pseudo (string)

// ── SESSION STATE ─────────────────────────────────────────────────────────
let currentPseudo = null;
let pronoIsAdmin  = false;

// ── STORAGE HELPERS ───────────────────────────────────────────────────────
function loadUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch { return {}; }
}
function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
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
  const el = document.getElementById('pseudo-nav-indicator');
  if (!el) return;
  if (!currentPseudo) {
    el.innerHTML = `<button class="nav-btn pni-login-btn" onclick="openPseudoModal()">👤 Connexion</button>`;
  } else {
    const badge = pronoIsAdmin ? '<span class="pni-admin-badge">ADMIN</span>' : '';
    const avHtml = typeof getAvatarHtml === 'function'
      ? getAvatarHtml(currentPseudo, loadUsers(), 24)
      : '';
    el.innerHTML = `<div class="pni-chip" onclick="openPseudoModal('Mon profil')" style="cursor:pointer" title="Modifier le profil">
      ${avHtml}
      <span class="pni-name">${currentPseudo}</span>${badge}
      <button class="pni-logout" onclick="event.stopPropagation();logoutPseudo()" title="Déconnexion">↩</button>
    </div>`;
  }
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

  // Scorers
  const realH = [...(real.homeScorers || [])];
  const realA = [...(real.awayScorers || [])];
  const proH  = prono.homeScorers || [];
  const proA  = prono.awayScorers || [];

  let fH = 0, fA = 0;
  proH.forEach(s => { const i = realH.indexOf(s); if (i !== -1) { fH++; realH.splice(i, 1); } });
  proA.forEach(s => { const i = realA.indexOf(s); if (i !== -1) { fA++; realA.splice(i, 1); } });

  const found = fH + fA;
  const totalProno = proH.length + proA.length;
  const totalReal  = (real.homeScorers || []).length + (real.awayScorers || []).length;

  if (found === totalReal && totalProno === totalReal && totalReal > 0) {
    pts.scorers = 5; // All correct: bonus
  } else {
    pts.scorers = found; // 1pt each
  }

  // +1pt penalty
  if (prono.penalty !== undefined && real.penalty !== undefined && prono.penalty === real.penalty) pts.penalty = 1;

  // +1pt red cards (exact count)
  if (prono.redCards !== undefined && real.redCards !== undefined && Number(prono.redCards) === Number(real.redCards)) pts.redCards = 1;

  pts.total = pts.winner + pts.score + pts.scorers + pts.penalty + pts.redCards;
  return pts;
}

function getUserStats(pseudo) {
  const users     = loadUsers();
  const real      = loadReal();
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
    .filter(p => p !== ADMIN_PSEUDO)
    .map(pseudo => ({ pseudo, ...getUserStats(pseudo) }))
    .sort((a, b) => b.total - a.total || b.exactScores - a.exactScores || b.matchCount - a.matchCount);
}

// ── SAVE USER PRONOSTIC ────────────────────────────────────────────────────
function _savePronostic(scoreKey, data) {
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
  saveUsers(users);
  _notify('✅ Pronostic enregistré!');
  // Refresh calendar status circles
  if (typeof renderCalendar === 'function') renderCalendar();
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
      <div class="prono-scorer-label">⚽ Buteurs Dom.${hVal > 0 && !isAdm ? ` (max ${hVal})` : ''}</div>
      <div class="prono-pills" id="${cid}">${_buildPills(cid, hPlayers, savedH, `${prefix === 'ad' ? 'ah' : 'ph'}-${key}`, isAdm)}</div>
    </div>`;
  }
  if (aVal > 0 || isAdm) {
    const cid = `${prefix}-as-${key}`;
    html += `<div class="prono-scorer-row">
      <div class="prono-scorer-label">⚽ Buteurs Ext.${aVal > 0 && !isAdm ? ` (max ${aVal})` : ''}</div>
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
        <div class="prono-block-title">📊 Ton pronostic ${medal}</div>
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
        <div class="prono-block-title">📊 Ton pronostic</div>
        <div class="prono-score-row">
          <span class="prono-team-lbl">${homeTeam}</span>
          <input type="number" id="ph-${scoreKey}" class="prono-score-inp" min="0" max="30"
            value="${initHNum}" placeholder="0" oninput="updatePronoScorers('${scoreKey}')">
          <span class="prono-sep">–</span>
          <input type="number" id="pa-${scoreKey}" class="prono-score-inp" min="0" max="30"
            value="${initANum}" placeholder="0" oninput="updatePronoScorers('${scoreKey}')">
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
            <input type="checkbox" id="p-pen-${scoreKey}" ${up.penalty ? 'checked' : ''}> 🫵 Penalty prévu
          </label>
          <label class="prono-extra-lbl">
            🟥 Cartons rouges:
            <input type="number" id="p-rc-${scoreKey}" class="prono-rc-inp" min="0" max="10" value="${up.redCards || 0}">
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
  const real    = loadReal();
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
      <div class="ldb-hero-title">🏆 CLASSEMENT</div>
      <div class="ldb-hero-sub">${board.length} joueur${board.length > 1 ? 's' : ''} · ${Object.keys(real).length} match${Object.keys(real).length > 1 ? 's' : ''} joué${Object.keys(real).length > 1 ? 's' : ''}</div>
      ${myRank ? `<div class="ldb-my-rank">Ta position : <strong>#${myRank}</strong></div>` : ''}
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

  // Animate bars + counters
  requestAnimationFrame(() => {
    setTimeout(() => {
      container.querySelectorAll('.ldb-bar-inner').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      container.querySelectorAll('.ldb-pts-main').forEach((el, i) => {
        const target = parseInt(el.textContent);
        if (!target) return;
        el.dataset.target = target;
        el.textContent = '0 ';
        const unit = document.createElement('span');
        unit.className = 'ldb-pts-unit';
        unit.textContent = 'pts';
        el.appendChild(unit);
        const start = performance.now();
        const d = 900;
        const step = ts => {
          const p = Math.min((ts - start) / d, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.firstChild.textContent = Math.round(target * eased) + ' ';
          if (p < 1) requestAnimationFrame(step);
          else el.firstChild.textContent = target + ' ';
        };
        setTimeout(() => requestAnimationFrame(step), i * 60);
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
}

function _renderPronosForUser(pseudo) {
  const users = loadUsers();
  const real  = loadReal();
  const u     = users[pseudo];
  const pronos = { ...(u?.pronos || {}), ...(u?.pronostics || {}) };
  const entries = Object.entries(pronos);
  if (!entries.length) return '<div class="ldb-pd-empty">Aucun pronostic</div>';

  return `<div class="ldb-pd-list">${entries.map(([key, prono]) => {
    const gId  = key.split('_')[0];
    const mIdx = parseInt(key.split('_')[1]);
    const group = GROUPS.find(g => g.id === gId);
    const match = group?.matches[mIdx];
    if (!match) return '';
    const realScore = real[key];
    const pts = realScore ? scorePoints(prono, realScore) : null;
    let ptsClass = 'ldb-pd-pts--pending';
    let ptsLabel = '–';
    if (pts) {
      ptsLabel = '+' + pts.total;
      ptsClass = pts.total >= 10 ? 'ldb-pd-pts--exact' : pts.total > 0 ? 'ldb-pd-pts--good' : 'ldb-pd-pts--miss';
    }
    const hInfo = group.teams.find(t => t.name === match.h);
    const aInfo = group.teams.find(t => t.name === match.a);
    return `<div class="ldb-pd-row">
      <span class="ldb-pd-teams">${hInfo?.flag||''}${match.h} <em>vs</em> ${match.a}${aInfo?.flag||''}</span>
      <span class="ldb-pd-score">${_pronoLabel(prono, match)}</span>
      ${realScore ? `<span class="ldb-pd-real">${realScore.score || ''}</span>` : '<span class="ldb-pd-real ldb-pd-real--pending">à jouer</span>'}
      <span class="ldb-pd-pts ${ptsClass}">${ptsLabel}</span>
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
  if (saved) {
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
