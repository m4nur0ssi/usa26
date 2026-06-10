/* WC 2026 — Splash BROADCAST v2 */
(function () {
  'use strict';

  if (window.__WC_SPLASH_PLAYED__) return;
  window.__WC_SPLASH_PLAYED__ = true;

  const PHASE1_MS = 2500;
  const PHASE2_MS = 2700;
  const PHASE3_MS = 3000;
  const FADE_MS   = 550;
  const EXIT_MS   = 1000;

  function build() {
    const el = document.createElement('div');
    el.id = 'wc-splash';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Introduction Coupe du Monde 2026');

    el.innerHTML = `
      <div class="sp-grain"></div>
      <div class="sp-bar sp-bar-top"></div>
      <div class="sp-bar sp-bar-bottom"></div>
      <button class="sp-skip" type="button">PASSER</button>

      <!-- Phase 1 : Identité -->
      <div class="sp-phase" id="sp-p1">
        <div class="p1-eyebrow">FIFA World Cup</div>
        <div class="p1-rule"></div>
        <div class="p1-title">Coupe du Monde</div>
        <div class="p1-sub">11 Juin — 19 Juillet &middot; 2026</div>
      </div>

      <!-- Phase 2 : Pays Hôtes -->
      <div class="sp-phase" id="sp-p2">
        <div class="p2-left">
          <div class="p2-host-line r1">
            <span class="p2-host-num">01</span>
            <span class="p2-host-name">États-Unis</span>
          </div>
          <div class="p2-host-line r2">
            <span class="p2-host-num">02</span>
            <span class="p2-host-name">Canada</span>
          </div>
          <div class="p2-host-line r3">
            <span class="p2-host-num">03</span>
            <span class="p2-host-name">Mexique</span>
          </div>
        </div>
        <div class="p2-divider"></div>
        <div class="p2-right">
          <div class="p2-stat">
            <span class="p2-stat-val">48</span>
            <span class="p2-stat-lbl">Nations</span>
          </div>
          <div class="p2-stat">
            <span class="p2-stat-val">104</span>
            <span class="p2-stat-lbl">Matchs</span>
          </div>
          <div class="p2-stat">
            <span class="p2-stat-val">16</span>
            <span class="p2-stat-lbl">Stades</span>
          </div>
          <div class="p2-date">11 Juin — 19 Juillet<br>2026</div>
        </div>
      </div>

      <!-- Phase 3 : 2026 -->
      <div class="sp-phase" id="sp-p3">
        <div class="p3-label">FIFA World Cup</div>
        <div class="p3-year">2026</div>
        <div class="p3-rule"></div>
        <div class="p3-hosts">
          <span class="p3-host">États-Unis</span>
          <span class="p3-dot"></span>
          <span class="p3-host">Canada</span>
          <span class="p3-dot"></span>
          <span class="p3-host">Mexique</span>
        </div>
      </div>
    `;

    document.body.appendChild(el);
    return el;
  }

  function play(splash) {
    const bars    = splash.querySelectorAll('.sp-bar');
    const p1      = splash.querySelector('#sp-p1');
    const p2      = splash.querySelector('#sp-p2');
    const p3      = splash.querySelector('#sp-p3');
    const skipBtn = splash.querySelector('.sp-skip');
    const timers  = [];

    let done = false;

    function later(fn, ms) {
      const id = setTimeout(fn, ms);
      timers.push(id);
    }

    function close() {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      splash.classList.add('is-leaving');
      setTimeout(() => {
        try { splash.parentNode.removeChild(splash); } catch (_) {}
        splash.classList.add('is-done');
      }, EXIT_MS);
    }

    function fadeOut(el, cb) {
      el.style.transition = `opacity ${FADE_MS}ms ease`;
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
      if (cb) setTimeout(cb, FADE_MS);
    }

    function activate(el) {
      el.style.transition = '';
      el.style.opacity = '';
      el.classList.add('active');
    }

    // Open letterbox bars + start phase 1
    bars.forEach(b => b.classList.add('open'));
    activate(p1);

    // Phase 1 → 2
    later(() => fadeOut(p1, () => activate(p2)), PHASE1_MS);

    // Phase 2 → 3
    later(
      () => fadeOut(p2, () => activate(p3)),
      PHASE1_MS + FADE_MS + PHASE2_MS
    );

    // Auto-close
    later(close, PHASE1_MS + FADE_MS + PHASE2_MS + FADE_MS + PHASE3_MS);

    // Skip handlers
    skipBtn.addEventListener('click', e => { e.stopPropagation(); close(); });
    splash.addEventListener('click', close);
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        document.removeEventListener('keydown', handler);
        close();
      }
    });
  }

  function init() {
    play(build());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
