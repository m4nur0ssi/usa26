/* WC 2026 — Splash ZOOM v3 (2s animated logo reveal) */
(function () {
  'use strict';

  if (window.__WC_SPLASH_PLAYED__) return;
  window.__WC_SPLASH_PLAYED__ = true;

  // Durée totale ~2s : zoom du logo puis on traverse vers le site.
  const HOLD_MS = 1500;   // zoom-in du logo + maintien
  const EXIT_MS = 500;    // zoom-through + fondu de sortie

  // Visuel officiel FIFA World Cup 26 (image jointe).
  const MARK = `<img class="sp-mark" src="images/wc26.png?v=2" alt="FIFA World Cup 26" draggable="false">`;

  function build() {
    const el = document.createElement('div');
    el.id = 'wc-splash';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Coupe du Monde 2026');
    el.innerHTML = `<div class="sp-stage">${MARK}</div>`;
    document.body.appendChild(el);
    return el;
  }

  function play(splash) {
    let done = false;

    function close() {
      if (done) return;
      done = true;
      splash.classList.add('is-leaving');
      setTimeout(() => {
        try { splash.parentNode.removeChild(splash); } catch (_) {}
      }, EXIT_MS);
    }

    // Lance le zoom d'entrée
    requestAnimationFrame(() => splash.classList.add('is-in'));

    // Sortie auto après le maintien
    const t = setTimeout(close, HOLD_MS);

    // Skip au tap / clavier
    splash.addEventListener('click', () => { clearTimeout(t); close(); });
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        document.removeEventListener('keydown', handler);
        clearTimeout(t); close();
      }
    });
  }

  function init() { play(build()); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
