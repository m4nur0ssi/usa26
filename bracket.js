'use strict';
/* ═══════════════════════════════════════════════════════════════════
   WC 2026 — Pronostics tab : match prono list + interactive bracket
   ═══════════════════════════════════════════════════════════════════ */

const GR_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

// ── SESSION / STORAGE ──────────────────────────────────────────────────
function _bPseudo() {
  const p = localStorage.getItem('wc2026_pseudo') || '';
  return (p && p !== '_admin_') ? p : '';
}
function _bKey(pseudo) { return 'wc2026_bracket_' + pseudo; }
function _loadBracket() {
  const p = _bPseudo();
  if (!p) return null;
  let b;
  try { b = JSON.parse(localStorage.getItem(_bKey(p))) || _emptyBracket(); }
  catch { b = _emptyBracket(); }
  if (!b.groups) b.groups = _emptyBracket().groups;
  if (!b.thirds) b.thirds = [];
  if (!b.ko) b.ko = {};
  if (!b.ranked) { b.ranked = {}; GROUPS.forEach(g => { b.ranked[g.id] = 0; }); }
  return b;
}
function _saveBracket(data) {
  const p = _bPseudo();
  if (!p) return;
  localStorage.setItem(_bKey(p), JSON.stringify(data));
}
function _emptyBracket() {
  const groups = {}, ranked = {};
  GROUPS.forEach(g => { groups[g.id] = g.teams.map(t => t.name); ranked[g.id] = 0; });
  return { groups, ranked, thirds: [], ko: {} };
}

// Team-info lookup by name
let _ALL_TEAMS = null;
function _teamInfo(name) {
  if (!_ALL_TEAMS) {
    _ALL_TEAMS = {};
    GROUPS.forEach(g => g.teams.forEach(t => { _ALL_TEAMS[t.name] = t; }));
  }
  return _ALL_TEAMS[name] || null;
}
function _flagHtml(name, cls) {
  const t = _teamInfo(name);
  const src = (t && typeof getFlagImg === 'function') ? getFlagImg(t.code) : null;
  if (src) return `<img src="${src}" class="${cls}" alt="">`;
  return `<span class="${cls} ${cls}-emoji">${t ? t.flag : '🏳️'}</span>`;
}

// ── TAB STATE ──────────────────────────────────────────────────────────
let _pronoTab = 'matchs';

function renderPronostics() {
  const c = document.getElementById('pronostics-content');
  if (!c) return;
  if (!_bPseudo()) {
    c.innerHTML = `
      <div class="prono-hub-empty">
        <div class="phe-icon">🎯</div>
        <div class="phe-title">Connecte-toi pour pronostiquer</div>
        <div class="phe-sub">Pronostique les matchs et construis ton tableau final.</div>
        <button class="phb-cta" onclick="openPseudoModal()">👤 Se connecter</button>
      </div>`;
    return;
  }
  c.innerHTML = `
    <div class="prono-hub-head">
      <h1 class="prono-hub-title">Pronostics</h1>
      <p class="prono-hub-sub">Choisis ton mode de prédiction</p>
    </div>
    <div class="prono-hub-tabs">
      <button class="phb ${_pronoTab === 'matchs' ? 'active' : ''}" onclick="setPronoTab('matchs')">
        <span class="phb-ico">⚽</span>
        <span class="phb-lbl">Prono des matchs</span>
        <span class="phb-desc">Score, buteurs, points par match</span>
      </button>
      <button class="phb ${_pronoTab === 'bracket' ? 'active' : ''}" onclick="setPronoTab('bracket')">
        <span class="phb-ico">🏆</span>
        <span class="phb-lbl">Mon Bracket</span>
        <span class="phb-desc">Classe les groupes, choisis les qualifiés, jusqu'à la finale</span>
      </button>
    </div>
    <div id="prono-tab-body"></div>`;
  _renderPronoTabBody();
}

function setPronoTab(tab) {
  _pronoTab = tab;
  document.querySelectorAll('.prono-hub-tabs .phb').forEach(b => b.classList.remove('active'));
  const idx = tab === 'matchs' ? 0 : 1;
  document.querySelectorAll('.prono-hub-tabs .phb')[idx]?.classList.add('active');
  _renderPronoTabBody();
}

function _renderPronoTabBody() {
  const body = document.getElementById('prono-tab-body');
  if (!body) return;
  if (_pronoTab === 'matchs') {
    body.innerHTML = _renderPronoMatches();
    _scrollToCurrentPronoMatch();
  } else {
    body.innerHTML = _renderBracketPredictor();
  }
}

// Amène automatiquement sur le pronostic du match en cours (sinon le prochain à jouer)
function _scrollToCurrentPronoMatch() {
  let liveKey = null, nextKey = null, nextTime = Infinity;
  const now = Date.now();
  (typeof _allFixtureGroups === 'function' ? _allFixtureGroups() : GROUPS).forEach(g => g.matches.forEach((m, i) => {
    const key = g.id + '_' + i;
    const st = (typeof matchLiveStatus === 'function') ? matchLiveStatus(m) : 'upcoming';
    if (st === 'live' && !liveKey) liveKey = key;
    if (st === 'upcoming') {
      const t = m.utc ? new Date(m.utc).getTime() : Infinity;
      if (t < nextTime) { nextTime = t; nextKey = key; }
    }
  }));
  const target = liveKey || nextKey;
  if (!target) return;
  setTimeout(() => {
    const el = document.getElementById('pmx-' + target);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('pmx-focus');
    setTimeout(() => el.classList.remove('pmx-focus'), 2200);
  }, 120);
}

// ── MATCH PRONO — storage helpers (shared wc2026_users store) ───────────
function _pmUsers() { try { return JSON.parse(localStorage.getItem('wc2026_users') || '{}'); } catch { return {}; } }
function _pmGet(key) { const p = _bPseudo(); if (!p) return {}; const u = _pmUsers(); return (u[p] && u[p].pronostics && u[p].pronostics[key]) || {}; }
function _pmSave(key, patch) {
  const p = _bPseudo(); if (!p) return null;
  const u = _pmUsers();
  if (!u[p]) u[p] = { pronostics: {} };
  if (!u[p].pronostics) u[p].pronostics = {};
  u[p].pronostics[key] = { ...(u[p].pronostics[key] || {}), ...patch, ts: Date.now() };
  localStorage.setItem('wc2026_users', JSON.stringify(u));
  if (typeof renderCalendar === 'function') renderCalendar();
  return u[p].pronostics[key];
}
function _ocFromScore(score) {
  if (!score) return null;
  const [h, a] = String(score).split('-').map(Number);
  if (isNaN(h) || isNaN(a)) return null;
  return h > a ? '1' : h < a ? '2' : 'N';
}
function _ocOf(pr) { return pr.outcome || _ocFromScore(pr.score); }
function _pmPool(name) {
  return (typeof ORIGINAL_LINEUPS !== 'undefined' && ORIGINAL_LINEUPS[name]) || (TEAMS[name] ? TEAMS[name].players : []) || [];
}
function _titulaires(name) {
  const pool = _pmPool(name);
  const t = pool.filter(p => p.role === 'Titulaire');
  return t.length ? t : pool;
}
function _remplacants(name) {
  return _pmPool(name).filter(p => p.role === 'Remplaçant');
}
function _teamCol(name) {
  return (typeof getTeamColor === 'function') ? getTeamColor(name) : '#6366f1';
}
function _colorScore(real, hc, ac) {
  const parts = String(real).split('-');
  if (parts.length === 2) return `<span style="color:${hc}">${parts[0].trim()}</span><span class="pmx-sc-dash">-</span><span style="color:${ac}">${parts[1].trim()}</span>`;
  return real;
}

// ── MATCH PRONO LIST (classé par date de match, pas par groupe) ─────────
// Tous les matchs aplatis et triés chronologiquement.
function _pronoMatchesSorted() {
  const arr = [];
  const groups = (typeof _allFixtureGroups === 'function') ? _allFixtureGroups() : GROUPS;
  const resolved = (n) => typeof _koTeamByName === 'function' && !!_koTeamByName(n);
  groups.forEach(g => g.matches.forEach((m, i) => {
    // Pour la phase finale : on n'affiche que les matchs dont les 2 équipes
    // sont connues (sinon "Vainqueur M73" non pronostiquable).
    if (m._ko && !(resolved(m.h) && resolved(m.a))) return;
    const key = g.id + '_' + i;
    const t = m.utc ? new Date(m.utc).getTime() : Infinity;
    arr.push({ g, m, i, key, t });
  }));
  arr.sort((a, b) => a.t - b.t);
  return arr;
}

// Prochain match à pronostiquer après `currentKey` (à venir, sans prono).
function _nextPronoKey(currentKey) {
  const list = _pronoMatchesSorted();
  const idx = list.findIndex(x => x.key === currentKey);
  for (let j = idx + 1; j < list.length; j++) {
    const { m, key } = list[j];
    const real = (typeof state !== 'undefined' && state.scores[key]) || m.s || '';
    if (real) continue;                       // déjà joué
    const pr = _pmGet(key);
    if (pr && (pr.score || pr.outcome)) continue; // déjà pronostiqué
    return key;
  }
  return null;
}

function _renderPronoMatches() {
  const list = _pronoMatchesSorted();
  let html = `<div class="pmx-wrap">`;
  let curDate = null;
  list.forEach(({ g, m, i, key }) => {
    if (m.d !== curDate) {
      if (curDate !== null) html += `</div>`;
      curDate = m.d;
      html += `<div class="pmx-group"><div class="pmx-group-hd">${m.d || ''}</div>`;
    }
    html += _renderPronoCard(g, m, i, key);
  });
  if (curDate !== null) html += `</div>`;
  return html + `</div>`;
}

function _renderPronoCard(g, m, i, key) {
  const real = (typeof state !== 'undefined' && state.scores[key]) || m.s || '';
  const pr = _pmGet(key);
  const oc = _ocOf(pr);
  const hInfo = g.teams.find(t => t.name === m.h);
  const aInfo = g.teams.find(t => t.name === m.a);
  const played = !!real;
  const dis = played ? 'disabled' : '';
  const on = v => oc === v ? 'on' : '';
  const hc = _teamCol(m.h), ac = _teamCol(m.a);
  const hasProno = !!(oc || pr.score);
  // Un score live 0-0 sans pronostic prête à confusion → score vide.
  const emptyScore = played && String(real).replace(/\s/g, '') === '0-0' && !hasProno;
  const detail = pr.score || (pr.homeScorers && pr.homeScorers.length) || (pr.awayScorers && pr.awayScorers.length) || pr.penalty || pr.redCards || pr.yellowCards;

  // Libellé du bouton bas selon l'état du match.
  let detailLabel;
  if (played) {
    // Match joué → on affiche le pronostic de l'utilisateur (pas l'icône cible).
    if (pr.score) detailLabel = `Ton prono : ${pr.score}`;
    else if (oc) detailLabel = `Ton prono : ${oc === '1' ? m.h : oc === '2' ? m.a : 'Nul'}`;
    else detailLabel = `Pas de prono`;
  } else if (pr.score) {
    detailLabel = `Score ${pr.score} — modifier`;   // icône cible retirée
  } else {
    detailLabel = `<span class="pmx-cta-ico">🎯</span> Fais ton pronostic`;
  }

  return `<div class="pmx-card ${played ? 'pmx-played' : ''}" id="pmx-${key}">
    <div class="pmx-top">
      <div class="pmx-team"><span class="pmx-fl">${hInfo?.flag || ''}</span><span class="pmx-nm">${m.h}</span></div>
      <div class="pmx-cen">${emptyScore
        ? `<span class="pmx-score pmx-score-empty"><span class="pmx-sc-n">–</span><span class="pmx-sc-dash">-</span><span class="pmx-sc-n">–</span></span>`
        : played ? `<span class="pmx-score">${_colorScore(real, hc, ac)}</span>` : `<span class="pmx-vs">VS</span>`}<span class="pmx-date">${m.t || ''}</span></div>
      <div class="pmx-team pmx-team-r"><span class="pmx-nm">${m.a}</span><span class="pmx-fl">${aInfo?.flag || ''}</span></div>
    </div>
    <div class="pmx-bet">
      <button class="pmx-bx ${on('1')}" ${dis} onclick="pmSetOutcome('${key}','1',this)"><b>1</b><small>${m.h}</small></button>
      <button class="pmx-bx pmx-bx-n ${on('N')}" ${dis} onclick="pmSetOutcome('${key}','N',this)"><b>N</b><small>Nul</small></button>
      <button class="pmx-bx ${on('2')}" ${dis} onclick="pmSetOutcome('${key}','2',this)"><b>2</b><small>${m.a}</small></button>
    </div>
    <button class="pmx-more ${detail ? 'pmx-more-set' : ''}" onclick="openMatchPronoPanel('${g.id}',${i})">
      <span>${detailLabel}</span>${detail ? '<span class="pmx-dot"></span>' : '<span class="pmx-chev">›</span>'}
    </button>
  </div>`;
}

function pmSetOutcome(key, val, btn) {
  if (!_bPseudo()) { if (typeof showNotification === 'function') showNotification('Connecte-toi pour pronostiquer', 'warning'); return; }
  _pmSave(key, { outcome: val });
  const wrap = btn.parentElement;
  wrap.querySelectorAll('.pmx-bx').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  btn.classList.remove('pmx-pop'); void btn.offsetWidth; btn.classList.add('pmx-pop');
  if (typeof showNotification === 'function') showNotification('✓ Prono validé', 'success');
}

// ── MATCH PRONO PANEL (redesigned) ──────────────────────────────────────
function openMatchPronoPanel(groupId, idx) {
  const g = (typeof _findFixtureGroup === 'function' ? _findFixtureGroup(groupId) : GROUPS.find(x => x.id === groupId)); if (!g) return;
  const m = g.matches[idx]; if (!m) return;
  const key = groupId + '_' + idx;
  const real = (typeof state !== 'undefined' && state.scores[key]) || m.s || '';
  const hInfo = g.teams.find(t => t.name === m.h);
  const aInfo = g.teams.find(t => t.name === m.a);
  const hc = _teamCol(m.h), ac = _teamCol(m.a);
  const headHtml = `
    <div class="pmp2-head">
      <div class="pmp2-team"><span class="pmp2-fl">${hInfo?.flag || ''}</span><span>${m.h}</span></div>
      <span class="pmp2-vs">${real ? _colorScore(real, hc, ac) : 'VS'}</span>
      <div class="pmp2-team pmp2-team-r"><span>${m.a}</span><span class="pmp2-fl">${aInfo?.flag || ''}</span></div>
    </div>
    <div class="pmp2-meta">${m.d || ''} · ${m.t || ''} · ${m.v || ''}</div>`;

  if (!_bPseudo()) {
    const cta = `<div class="pmp2"><div style="padding:20px;text-align:center">
      <div style="font-size:2.4rem">🎯</div>
      <div style="font-weight:800;margin:8px 0">Connecte-toi pour pronostiquer</div>
      <button class="pmp2-save" onclick="openPseudoModal()">👤 Se connecter</button></div></div>`;
    if (typeof openPanel === 'function') openPanel(`<div class="pmp2">${headHtml}${cta}</div>`, `${m.h} – ${m.a}`);
    return;
  }

  const pr = _pmGet(key);
  const oc = _ocOf(pr);
  const hT = _titulaires(m.h), hR = _remplacants(m.h), aT = _titulaires(m.a), aR = _remplacants(m.a);
  const [ph, pa] = (pr.score || '').split('-');
  const ih = (ph !== undefined && ph !== '' && !isNaN(+ph)) ? +ph : '';
  const ia = (pa !== undefined && pa !== '' && !isNaN(+pa)) ? +pa : '';

  // Played → recap
  if (real) {
    const realData = (typeof loadReal === 'function' ? (loadReal()[key] || null) : null) || { score: real };
    const pts = (typeof scorePoints === 'function' && pr.score) ? scorePoints(pr, realData) : null;
    const recap = `<div class="pmp2">${headHtml}
      <div class="pmp2-sect">
        <div class="pmp2-lbl">Résultat officiel</div>
        <div class="pmp2-recap-score">${real}</div>
      </div>
      ${pr.score ? `<div class="pmp2-sect">
        <div class="pmp2-lbl">Ton pronostic</div>
        <div class="pmp2-recap-mine">Score ${pr.score}${(pr.homeScorers||[]).concat(pr.awayScorers||[]).length ? ' · ⚽ ' + (pr.homeScorers||[]).concat(pr.awayScorers||[]).map(s=>s.split(' ').pop()).join(', ') : ''}${pr.penalty ? ' · 🥅' : ''}${pr.redCards ? ' · 🟥'+pr.redCards : ''}</div>
        ${pts ? `<div class="pmp2-recap-pts">${pts.total} pt${pts.total>1?'s':''}</div>` : ''}
      </div>` : `<div class="pmp2-sect"><div class="pmp2-hint">Tu n'avais pas pronostiqué ce match.</div></div>`}
    </div>`;
    if (typeof openPanel === 'function') openPanel(recap, `${m.h} – ${m.a}`);
    return;
  }

  const html = `<div class="pmp2">${headHtml}
    <div class="pmp2-sect">
      <div class="pmp2-lbl">Résultat</div>
      <div class="pmp2-oc">
        <button class="pmp2-ocbtn ${oc==='1'?'on':''}" data-oc="1" onclick="pmpOutcome(this)"><b>1</b><small>${m.h}</small></button>
        <button class="pmp2-ocbtn pmp2-ocbtn-n ${oc==='N'?'on':''}" data-oc="N" onclick="pmpOutcome(this)"><b>N</b><small>Nul</small></button>
        <button class="pmp2-ocbtn ${oc==='2'?'on':''}" data-oc="2" onclick="pmpOutcome(this)"><b>2</b><small>${m.a}</small></button>
      </div>
    </div>
    <div class="pmp2-sect">
      <div class="pmp2-lbl">Score exact</div>
      <div class="pmp2-score">
        <div class="pmp2-stepper">
          <button onclick="pmpStep('mp-h-${key}',-1)">−</button>
          <input id="mp-h-${key}" type="number" min="0" max="20" value="${ih}" placeholder="0" oninput="pmpScoreChange('${key}')">
          <button onclick="pmpStep('mp-h-${key}',1)">+</button>
        </div>
        <span class="pmp2-dash">–</span>
        <div class="pmp2-stepper">
          <button onclick="pmpStep('mp-a-${key}',-1)">−</button>
          <input id="mp-a-${key}" type="number" min="0" max="20" value="${ia}" placeholder="0" oninput="pmpScoreChange('${key}')">
          <button onclick="pmpStep('mp-a-${key}',1)">+</button>
        </div>
      </div>
    </div>
    <div class="pmp2-sect" id="mp-scorers-${key}">
      ${_pmpScorers(key, hT, hR, aT, aR, ih || 0, ia || 0, pr.homeScorers || [], pr.awayScorers || [])}
    </div>
    <div class="pmp2-sect">
      <div class="pmp2-lbl">Évènements</div>
      <button class="pmp2-toggle ${pr.penalty?'on':''}" id="mp-pen-${key}" onclick="pmpToggle(this)">🥅 Penalty marqué</button>
      <div class="pmp2-cards">
        <div class="pmp2-card-row">
          <span class="pmp2-card-lbl">🟨 Cartons jaunes</span>
          <div class="pmp2-stepper pmp2-stepper-sm">
            <button onclick="pmpStep('mp-yc-${key}',-1)">−</button>
            <input id="mp-yc-${key}" type="number" min="0" max="20" value="${pr.yellowCards || 0}">
            <button onclick="pmpStep('mp-yc-${key}',1)">+</button>
          </div>
        </div>
        <div class="pmp2-card-row">
          <span class="pmp2-card-lbl">🟥 Cartons rouges</span>
          <div class="pmp2-stepper pmp2-stepper-sm">
            <button onclick="pmpStep('mp-rc-${key}',-1)">−</button>
            <input id="mp-rc-${key}" type="number" min="0" max="10" value="${pr.redCards || 0}">
            <button onclick="pmpStep('mp-rc-${key}',1)">+</button>
          </div>
        </div>
      </div>
    </div>
    <button class="pmp2-save" onclick="pmpSave('${key}')">💾 Valider mon prono</button>
  </div>`;
  if (typeof openPanel === 'function') openPanel(html, `${m.h} – ${m.a}`);
}

function _pmpScorers(key, hT, hR, aT, aR, hN, aN, selH, selA) {
  if (hN <= 0 && aN <= 0) {
    return `<div class="pmp2-lbl">Buteurs</div><div class="pmp2-hint">Choisis un score pour sélectionner les buteurs ⚽</div>`;
  }
  let html = `<div class="pmp2-lbl">Buteurs</div>`;
  if (hN > 0) html += `<div class="pmp2-pilltitle">Domicile <small>(max ${hN})</small></div>` + _pmpPillGroup('mp-hsp-' + key, hT, hR, selH, hN);
  if (aN > 0) html += `<div class="pmp2-pilltitle">Extérieur <small>(max ${aN})</small></div>` + _pmpPillGroup('mp-asp-' + key, aT, aR, selA, aN);
  return html;
}
function _pmpPillGroup(cid, titus, remps, sel, max) {
  const pill = p => {
    const s = p.name.split(' ').pop().toUpperCase();
    const on = sel.includes(p.name) ? 'on' : '';
    return `<button class="pmp2-pill ${on}" data-fn="${p.name.replace(/"/g, '&quot;')}" onclick="pmpPickScorer(this)">${s}</button>`;
  };
  let h = `<div class="pmp2-pillgroup" id="${cid}" data-max="${max}">`;
  if (titus.length) h += `<div class="pmp2-pillsub">Titulaires</div><div class="pmp2-pillrow">${titus.map(pill).join('')}</div>`;
  if (remps.length) h += `<div class="pmp2-pillsub">Remplaçants</div><div class="pmp2-pillrow">${remps.map(pill).join('')}</div>`;
  return h + `</div>`;
}
function _pmSel(cid) {
  const c = document.getElementById(cid); if (!c) return [];
  return Array.from(c.querySelectorAll('.pmp2-pill.on')).map(b => b.dataset.fn);
}
function pmpPickScorer(btn) {
  const row = btn.closest('.pmp2-pillgroup'); if (!row) return;
  const max = parseInt(row.dataset.max) || 0;
  if (!btn.classList.contains('on') && row.querySelectorAll('.pmp2-pill.on').length >= max) {
    if (typeof showNotification === 'function') showNotification(`Max ${max} buteur${max > 1 ? 's' : ''}`, 'warning'); return;
  }
  btn.classList.toggle('on');
  btn.classList.remove('pmx-pop'); void btn.offsetWidth; btn.classList.add('pmx-pop');
}
function pmpOutcome(btn) {
  btn.parentElement.querySelectorAll('.pmp2-ocbtn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  btn.classList.remove('pmx-pop'); void btn.offsetWidth; btn.classList.add('pmx-pop');
  // « Nul » sans score touché → pré-remplit 0-0 (chiffres en gras, score exact).
  if (btn.dataset.oc === 'N') {
    const root = btn.closest('.pmp2');
    const hIn = root?.querySelector('input[id^="mp-h-"]');
    const aIn = root?.querySelector('input[id^="mp-a-"]');
    if (hIn && aIn && hIn.value === '' && aIn.value === '') {
      hIn.value = 0; aIn.value = 0;
      pmpScoreChange(hIn.id.slice(5));
    }
  }
}
function pmpToggle(btn) {
  btn.classList.toggle('on');
  btn.classList.remove('pmx-pop'); void btn.offsetWidth; btn.classList.add('pmx-pop');
}
function pmpStep(id, d) {
  const el = document.getElementById(id); if (!el) return;
  let v = (parseInt(el.value) || 0) + d; if (v < 0) v = 0;
  const mx = parseInt(el.max) || 99; if (v > mx) v = mx;
  el.value = v;
  if (id.startsWith('mp-h-') || id.startsWith('mp-a-')) pmpScoreChange(id.slice(5));
}
function pmpScoreChange(key) {
  const gid = key.split('_')[0];
  const g = (typeof _findFixtureGroup === 'function' ? _findFixtureGroup(gid) : GROUPS.find(x => x.id === gid)); if (!g) return;
  const idx = parseInt(key.split('_')[1]); const m = g.matches[idx]; if (!m) return;
  const hT = _titulaires(m.h), hR = _remplacants(m.h), aT = _titulaires(m.a), aR = _remplacants(m.a);
  const hN = parseInt(document.getElementById('mp-h-' + key)?.value) || 0;
  const aN = parseInt(document.getElementById('mp-a-' + key)?.value) || 0;
  const selH = _pmSel('mp-hsp-' + key), selA = _pmSel('mp-asp-' + key);
  const c = document.getElementById('mp-scorers-' + key);
  if (c) c.innerHTML = _pmpScorers(key, hT, hR, aT, aR, hN, aN, selH, selA);
}
function pmpSave(key) {
  if (!_bPseudo()) { if (typeof showNotification === 'function') showNotification('Connecte-toi pour pronostiquer', 'warning'); return; }
  const oc = document.querySelector('.pmp2-oc .pmp2-ocbtn.on')?.dataset.oc || null;
  const hv = document.getElementById('mp-h-' + key)?.value;
  const av = document.getElementById('mp-a-' + key)?.value;
  // Un champ vide vaut 0 : « 1 » + champ intact → 1-0 ; rien touché → 0-0.
  const hvSet = hv !== '' && hv != null;
  const avSet = av !== '' && av != null;
  let score;
  if (hvSet || avSet) score = `${parseInt(hv) || 0}-${parseInt(av) || 0}`;
  else if (!oc) score = '0-0';   // aucun champ ni issue touchés → score par défaut 0-0
  const patch = {
    outcome: oc || _ocFromScore(score),
    homeScorers: _pmSel('mp-hsp-' + key),
    awayScorers: _pmSel('mp-asp-' + key),
    penalty: document.getElementById('mp-pen-' + key)?.classList.contains('on') || false,
    yellowCards: parseInt(document.getElementById('mp-yc-' + key)?.value) || 0,
    redCards: parseInt(document.getElementById('mp-rc-' + key)?.value) || 0,
  };
  if (score) patch.score = score;
  _pmSave(key, patch);
  if (typeof showNotification === 'function') showNotification('✓ Prono enregistré !', 'success');
  _renderPronoTabBody();
  // Enchaîne automatiquement sur le prochain match à pronostiquer.
  const nextKey = _nextPronoKey(key);
  if (nextKey) {
    const [ngid, nidx] = nextKey.split('_');
    openMatchPronoPanel(ngid, parseInt(nidx));
  } else if (typeof closePanel === 'function') {
    closePanel();
  }
}

// ── BRACKET PREDICTOR ──────────────────────────────────────────────────
// Same R32 seeding table as renderKnockout()
function _m32Defs(firsts, seconds, thirdsSlot) {
  const f = i => firsts[i], s = i => seconds[i], t = i => thirdsSlot[i];
  return [
    { a: f(0),  b: t(0) },  { a: s(1),  b: s(2)  },
    { a: f(4),  b: t(1) },  { a: f(5),  b: t(2)  },
    { a: f(2),  b: t(3) },  { a: s(3),  b: s(4)  },
    { a: f(7),  b: t(4) },  { a: f(8),  b: t(5)  },
    { a: f(1),  b: t(6) },  { a: s(5),  b: s(6)  },
    { a: f(3),  b: t(7) },  { a: s(7),  b: s(8)  },
    { a: f(6),  b: s(0) },  { a: f(9),  b: s(10) },
    { a: f(10), b: s(9) },  { a: f(11), b: s(11) },
  ];
}

function _bracketSeeds() {
  const b = _loadBracket();
  const done = L => (b.ranked?.[L] || 0) === 4;
  const firsts  = GR_LETTERS.map(L => done(L) ? (b.groups[L]?.[0] || null) : null);
  const seconds = GR_LETTERS.map(L => done(L) ? (b.groups[L]?.[1] || null) : null);
  // selected thirds in group-letter order → fill 8 slots
  const sortedThirds = b.thirds.slice().sort((x, y) => GR_LETTERS.indexOf(x) - GR_LETTERS.indexOf(y));
  const thirdsSlot = sortedThirds.map(L => done(L) ? (b.groups[L]?.[2] || null) : null);
  while (thirdsSlot.length < 8) thirdsSlot.push(null);
  return { b, firsts, seconds, thirdsSlot };
}

function _renderBracketPredictor() {
  const { b } = _bracketSeeds();
  const thirdsDone = b.thirds.length === 8;
  const allGroupsDone = GROUPS.every(g => (b.ranked?.[g.id] || 0) === 4);

  // Phase 1 — groups (FIFA-style: flag tiles on top, click to rank)
  const groupsHtml = GROUPS.map(g => {
    const order = b.groups[g.id] || g.teams.map(t => t.name);
    const rk = b.ranked?.[g.id] || 0;
    const placed = order.slice(0, rk);
    const pool = order.slice(rk);
    const tilesHtml = pool.map(name => `
      <button class="bp-tile" onclick="bPickTeam('${g.id}','${name.replace(/'/g, "\\'")}')" title="${name}">
        ${_flagHtml(name, 'bp-tile-flag')}
        <span class="bp-tile-name">${name}</span>
        <span class="bp-tile-pos">${rk + 1}<small>e</small></span>
      </button>`).join('');
    const placedHtml = placed.map((name, idx) => {
      const cls = idx < 2 ? 'bp-qual' : idx === 2 ? 'bp-third' : 'bp-out';
      const tag = idx < 2 ? 'Qualifié' : idx === 2 ? '3e' : 'Éliminé';
      return `<div class="bp-row ${cls}">
        <span class="bp-rank">${idx + 1}</span>
        ${_flagHtml(name, 'bp-flag')}
        <span class="bp-name">${name}</span>
        <span class="bp-row-tag">${tag}</span>
        <span class="bp-arrows">
          <button class="bp-arrow" ${idx === 0 ? 'disabled' : ''} onclick="bMoveTeam('${g.id}',${idx},-1)">▲</button>
          <button class="bp-arrow" ${idx === rk - 1 ? 'disabled' : ''} onclick="bMoveTeam('${g.id}',${idx},1)">▼</button>
        </span>
      </div>`;
    }).join('');
    const hint = rk < 4
      ? `<div class="bp-pick-hint">👆 Clique un drapeau pour le placer en <b>${rk + 1}${rk === 0 ? 'ère' : 'e'}</b> position</div>`
      : '';
    return `<div class="bp-group ${rk === 4 ? 'bp-group-done' : ''}">
      <div class="bp-group-hd"><span>Groupe ${g.id}</span>
        <span class="bp-group-hd-actions">
          <button class="bp-form-btn" onclick="bShowForm('${g.id}')" title="Forme des équipes">Forme</button>
          ${rk > 0 ? `<button class="bp-grp-reset" onclick="bResetGroup('${g.id}')" title="Réinitialiser ce groupe">↺</button>` : ''}
        </span>
      </div>
      ${tilesHtml ? `<div class="bp-tiles">${tilesHtml}</div>` : ''}
      ${hint}
      ${placedHtml ? `<div class="bp-rows">${placedHtml}</div>` : ''}
    </div>`;
  }).join('');

  // Phase 2 — best thirds (pick 8 of 12) — only fully-ranked groups
  const thirdsHtml = allGroupsDone
    ? GR_LETTERS.map(L => {
        const name = b.groups[L]?.[2];
        if (!name) return '';
        const on = b.thirds.includes(L);
        return `<button class="bp-third-chip ${on ? 'on' : ''}" onclick="bToggleThird('${L}')">
          ${_flagHtml(name, 'bp-flag-sm')}
          <span class="bp-third-name">${name}</span>
          <span class="bp-third-grp">3e ${L}</span>
        </button>`;
      }).join('')
    : `<div class="bp-ko-locked">🔒 Classe d'abord tous les groupes (${GROUPS.filter(g => (b.ranked?.[g.id] || 0) === 4).length}/${GROUPS.length})</div>`;

  // Phase 3 — knockout tree
  let koHtml;
  if (!allGroupsDone || !thirdsDone) {
    koHtml = `<div class="bp-ko-locked">🔒 Sélectionne les 8 meilleurs 3es pour débloquer le tableau final (${b.thirds.length}/8)</div>`;
  } else {
    koHtml = _renderKOTree();
  }

  return `
    <div class="bp-wrap">
      <div class="bp-section">
        <div class="bp-step-hd"><span class="bp-step-n">1</span> Classe chaque groupe</div>
        <div class="bp-legend"><span class="bp-lg bp-lg-q">1er/2e qualifiés</span><span class="bp-lg bp-lg-t">3e candidat</span><span class="bp-lg bp-lg-o">éliminé</span></div>
        <div class="bp-groups-grid">${groupsHtml}</div>
      </div>
      <div class="bp-section">
        <div class="bp-step-hd"><span class="bp-step-n">2</span> Choisis les 8 meilleurs 3es <span class="bp-count">${b.thirds.length}/8</span></div>
        <div class="bp-thirds-grid">${thirdsHtml}</div>
      </div>
      <div class="bp-section">
        <div class="bp-step-hd"><span class="bp-step-n">3</span> Le tableau final — clique le vainqueur de chaque match</div>
        ${koHtml}
      </div>
      <div class="bp-actions">
        <button class="bp-reset" onclick="bResetBracket()">↺ Réinitialiser</button>
      </div>
    </div>`;
}

// Resolve KO rounds from seeds + saved winners
function _computeKORounds() {
  const { firsts, seconds, thirdsSlot, b } = _bracketSeeds();
  const m32 = _m32Defs(firsts, seconds, thirdsSlot);
  const ko = b.ko || {};
  const rounds = [];
  // Round 0 — R32 (16 matches), teams from seeds
  let r0 = m32.map((mm, i) => ({ id: 'r0_' + i, a: mm.a, b: mm.b }));
  rounds.push(r0);
  // Rounds 1..4 derived from winners
  let prev = r0;
  for (let r = 1; r <= 4; r++) {
    const cur = [];
    for (let i = 0; i < prev.length / 2; i++) {
      const a = ko[prev[2 * i].id] || null;
      const bb = ko[prev[2 * i + 1].id] || null;
      cur.push({ id: 'r' + r + '_' + i, a, b: bb });
    }
    rounds.push(cur);
    prev = cur;
  }
  return { rounds, ko };
}

function _renderKOTree() {
  const { rounds, ko } = _computeKORounds();
  const titles = ['16es', '8es', 'Quarts', 'Demis', 'Finale'];
  const colsHtml = rounds.map((round, ri) => {
    const matches = round.map(mm => {
      const winner = ko[mm.id] || null;
      return `<div class="bp-ko-match" data-mid="${mm.id}">
        ${_koTeamSlot(mm.id, mm.a, winner)}
        ${_koTeamSlot(mm.id, mm.b, winner)}
      </div>`;
    }).join('');
    return `<div class="bp-ko-col">
      <div class="bp-ko-coltitle">${titles[ri]}</div>
      <div class="bp-ko-matches">${matches}</div>
    </div>`;
  }).join('');

  // champion
  const finalWinner = ko['r4_0'];
  const champHtml = finalWinner
    ? `<div class="bp-champ"><div class="bp-champ-lbl">Ton champion</div>
        <div class="bp-champ-team">${_flagHtml(finalWinner, 'bp-champ-flag')}<span>${finalWinner}</span></div></div>`
    : '';

  return `<div class="bp-ko-scroll"><div class="bp-ko-cols">${colsHtml}</div></div>${champHtml}`;
}

function _koTeamSlot(mid, name, winner) {
  if (!name) return `<div class="bp-ko-team bp-ko-tbd">À déterminer</div>`;
  const won = winner === name ? 'won' : (winner ? 'lost' : '');
  return `<button class="bp-ko-team ${won}" onclick="bPickWinner('${mid}','${name.replace(/'/g, "\\'")}')">
    ${_flagHtml(name, 'bp-flag-sm')}<span class="bp-ko-name">${name}</span>
  </button>`;
}

// ── BRACKET INTERACTIONS ───────────────────────────────────────────────
function bMoveTeam(groupId, idx, dir) {
  const b = _loadBracket();
  const arr = b.groups[groupId];
  const rk = b.ranked?.[groupId] || 0;
  const j = idx + dir;
  if (j < 0 || j >= rk) return;   // reorder only within ranked region
  [arr[idx], arr[j]] = [arr[j], arr[idx]];
  b.ko = {};                       // group change invalidates KO picks
  _saveBracket(b);
  _renderPronoTabBody();
}

// Click a pool team → place it at next rank slot
function bPickTeam(groupId, name) {
  const b = _loadBracket();
  const arr = b.groups[groupId];
  const rk = b.ranked?.[groupId] || 0;
  const cur = arr.indexOf(name);
  if (cur === -1 || cur < rk) return;
  arr.splice(cur, 1);
  arr.splice(rk, 0, name);
  b.ranked[groupId] = rk + 1;
  b.ko = {};
  _saveBracket(b);
  _renderPronoTabBody();
}

// Reset a single group's ranking
function bResetGroup(groupId) {
  const b = _loadBracket();
  b.ranked[groupId] = 0;
  const L = groupId;
  const ti = b.thirds.indexOf(L);
  if (ti !== -1) b.thirds.splice(ti, 1);
  b.ko = {};
  _saveBracket(b);
  _renderPronoTabBody();
}

function bToggleThird(letter) {
  const b = _loadBracket();
  const i = b.thirds.indexOf(letter);
  if (i !== -1) b.thirds.splice(i, 1);
  else {
    if (b.thirds.length >= 8) { if (typeof showNotification === 'function') showNotification('Déjà 8 sélectionnés', 'warning'); return; }
    b.thirds.push(letter);
  }
  b.ko = {};
  _saveBracket(b);
  _renderPronoTabBody();
}

function bPickWinner(mid, name) {
  const b = _loadBracket();
  if (b.ko[mid] === name) return;
  b.ko[mid] = name;
  // clear downstream picks that referenced the previous winner of this match
  _clearDownstream(b, mid);
  _saveBracket(b);
  _renderPronoTabBody();
}

// When a winner changes, any later-round pick equal to the old propagation must be cleared.
function _clearDownstream(b, changedMid) {
  // Recompute and drop ko entries whose match no longer contains the saved winner
  for (let pass = 0; pass < 5; pass++) {
    const { rounds } = _computeKORoundsFrom(b);
    let changed = false;
    rounds.forEach(round => round.forEach(mm => {
      const w = b.ko[mm.id];
      if (w && w !== mm.a && w !== mm.b) { delete b.ko[mm.id]; changed = true; }
    }));
    if (!changed) break;
  }
}
function _computeKORoundsFrom(b) {
  const done = L => (b.ranked?.[L] || 0) === 4;
  const firsts  = GR_LETTERS.map(L => done(L) ? (b.groups[L]?.[0] || null) : null);
  const seconds = GR_LETTERS.map(L => done(L) ? (b.groups[L]?.[1] || null) : null);
  const sortedThirds = b.thirds.slice().sort((x, y) => GR_LETTERS.indexOf(x) - GR_LETTERS.indexOf(y));
  const thirdsSlot = sortedThirds.map(L => done(L) ? (b.groups[L]?.[2] || null) : null);
  while (thirdsSlot.length < 8) thirdsSlot.push(null);
  const m32 = _m32Defs(firsts, seconds, thirdsSlot);
  const ko = b.ko || {};
  const rounds = [];
  let prev = m32.map((mm, i) => ({ id: 'r0_' + i, a: mm.a, b: mm.b }));
  rounds.push(prev);
  for (let r = 1; r <= 4; r++) {
    const cur = [];
    for (let i = 0; i < prev.length / 2; i++) {
      cur.push({ id: 'r' + r + '_' + i, a: ko[prev[2 * i].id] || null, b: ko[prev[2 * i + 1].id] || null });
    }
    rounds.push(cur);
    prev = cur;
  }
  return { rounds };
}

function bResetBracket() {
  if (!confirm('Réinitialiser tout ton bracket ?')) return;
  _saveBracket(_emptyBracket());
  _renderPronoTabBody();
}

// ── TEAM FORM (derived from FIFA ranking) ──────────────────────────────
// Deterministic seeded RNG so each team's "form" is stable across renders
function _seedFromStr(s) {
  let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
}
// 5-match form derived from fifaRank: strong team (low rank) → more W
function _teamForm(t) {
  const rank = t?.rank || t?.fifaRank || 50;
  const pWin = Math.max(0.15, Math.min(0.85, 0.9 - rank / 110));
  const pDraw = 0.25;
  const rng = _seedFromStr((t?.code || t?.name || 'X') + rank);
  const out = [];
  for (let i = 0; i < 5; i++) {
    const r = rng();
    out.push(r < pWin ? 'W' : r < pWin + pDraw ? 'D' : 'L');
  }
  return out;
}
function _formDot(res) {
  const map = { W: ['bp-fd-w', '✓'], D: ['bp-fd-d', '–'], L: ['bp-fd-l', '✕'] };
  const [cls, ch] = map[res] || map.D;
  return `<span class="bp-fd ${cls}">${ch}</span>`;
}

function bShowForm(groupId) {
  const g = GROUPS.find(x => x.id === groupId);
  if (!g) return;
  const rnk = t => t.rank || t.fifaRank || 99;
  const teams = g.teams.slice().sort((a, b) => rnk(a) - rnk(b));
  const rows = teams.map(t => {
    const form = _teamForm(t);
    return `<div class="bp-form-row">
      <div class="bp-form-team">${_flagHtml(t.name, 'bp-flag')}<span class="bp-form-name">${t.name}</span></div>
      <div class="bp-form-dots">${form.map(_formDot).join('')}</div>
      <div class="bp-form-rank">#${rnk(t)}</div>
    </div>`;
  }).join('');
  const html = `
    <div class="bp-form-panel">
      <div class="bp-form-head">
        <div class="bp-form-title">Forme de l'équipe</div>
        <div class="bp-form-group">GROUPE ${g.id}</div>
      </div>
      <div class="bp-form-table">
        <div class="bp-form-thead"><span>Équipe</span><span>Forme actuelle</span><span>FIFA</span></div>
        ${rows}
      </div>
      <div class="bp-form-foot">Forme estimée à partir du classement FIFA · ✓ victoire · – nul · ✕ défaite</div>
    </div>`;
  if (typeof openPanel === 'function') openPanel(html, `Forme — Groupe ${g.id}`);
}
