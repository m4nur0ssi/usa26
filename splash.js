/* WC 2026 — Splash CINEMA v5 */
(function () {
  'use strict';

  if (window.__WC_SPLASH_PLAYED__) return;
  window.__WC_SPLASH_PLAYED__ = true;

  const HOLD_MS = 4400;   // durée avant sortie auto (+2 s vs v4)
  const EXIT_MS = 620;    // durée de l'animation de sortie

  /* Injecte les nouveaux éléments dans le splash (existant ou créé) */
  function upgrade(splash) {
    const stage = splash.querySelector('.sp-stage');
    const stageHTML = stage
      ? stage.outerHTML
      : `<div class="sp-stage"><img class="sp-mark" src="images/wc26.png?v=2" alt="FIFA World Cup 26" draggable="false"></div>`;

    splash.innerHTML = `
      <div class="sp-bar-t"></div>
      <div class="sp-bar-b"></div>
      ${stageHTML}
      <div class="sp-sweep"></div>
      <div class="sp-text">
        <span class="sp-lw"><span class="sp-l sp-l1">FIFA World Cup</span></span>
        <span class="sp-lw"><span class="sp-l sp-l2">2026</span></span>
        <span class="sp-lw"><span class="sp-l sp-l3">Mexico &middot; Canada &middot; USA</span></span>
      </div>
      <div class="sp-flash"></div>
    `;
  }

  function play(splash) {
    upgrade(splash);

    let done = false;

    function close() {
      if (done) return;
      done = true;
      splash.classList.add('is-leaving');
      setTimeout(function () {
        try { splash.parentNode.removeChild(splash); } catch (_) {}
      }, EXIT_MS);
    }

    /* Lance l'animation d'entrée au prochain frame */
    requestAnimationFrame(function () { splash.classList.add('is-in'); });

    /* Sortie automatique */
    var t = setTimeout(close, HOLD_MS);

    /* Skip au tap / clic */
    splash.addEventListener('click', function () { clearTimeout(t); close(); });

    /* Skip au clavier */
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        document.removeEventListener('keydown', handler);
        clearTimeout(t);
        close();
      }
    });
  }

  function build() {
    var el = document.createElement('div');
    el.id = 'wc-splash';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Coupe du Monde 2026');
    document.body.appendChild(el);
    return el;
  }

  function init() {
    play(document.getElementById('wc-splash') || build());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
