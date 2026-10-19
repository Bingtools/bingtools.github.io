/* Sketch edition: spatial paper interaction, no imitation 3D tiger mesh. */
(() => {
  'use strict';
  document.querySelectorAll('[data-copy-contact]').forEach(button => {
    button.addEventListener('click', async () => {
      const contactStatus = button.closest('[data-contact-scope]').querySelector('[data-contact-status]');
      const number = button.dataset.copyContact;
      const label = button.closest('.contact-card').querySelector('h3').textContent;
      try {
        await navigator.clipboard.writeText(number);
        contactStatus.textContent = `${label} ${number} 已复制，可在 QQ 中搜索添加。`;
      } catch {
        contactStatus.textContent = `未能自动复制，请手动复制${label}：${number}。`;
      }
    });
  });
  const stage = document.getElementById('paperStage');
  const scene = document.getElementById('paperScene');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let drag = null, rx = 4, ry = -8, raf = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function draw() {
    raf = 0;
    scene.style.setProperty('--rx', `${rx}deg`);
    scene.style.setProperty('--ry', `${ry}deg`);
  }
  function render() { if (!raf) raf = requestAnimationFrame(draw); }
  function reset() { drag = null; rx = 4; ry = -8; render(); }
  stage.addEventListener('pointerdown', e => {
    if (reduced.matches || (e.pointerType === 'mouse' && e.button !== 0)) return;
    stage.focus({ preventScroll: true });
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, rx, ry };
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', e => {
    if (reduced.matches) return;
    if (drag && e.pointerId === drag.id) {
      rx = clamp(drag.rx - (e.clientY - drag.y) * .12, -20, 20);
      ry = clamp(drag.ry + (e.clientX - drag.x) * .16, -32, 32);
    } else if (e.pointerType === 'mouse') {
      const r = stage.getBoundingClientRect();
      rx = 4 - ((e.clientY - r.top) / r.height - .5) * 8;
      ry = -8 + ((e.clientX - r.left) / r.width - .5) * 12;
    } else return;
    render();
  });
  function release(e) { if (!drag || drag.id !== e.pointerId) return; if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId); drag = null; }
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);
  stage.addEventListener('lostpointercapture', () => { drag = null; });
  stage.addEventListener('pointerleave', () => { if (!drag) reset(); });
  stage.addEventListener('dblclick', reset);
  document.getElementById('paperReset').addEventListener('click', reset);
  stage.addEventListener('keydown', e => {
    if (!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home'].includes(e.key)) return;
    e.preventDefault();
    if (e.key === 'Home') return reset();
    if (reduced.matches) return;
    rx = clamp(rx + (e.key === 'ArrowUp' ? -4 : e.key === 'ArrowDown' ? 4 : 0), -20, 20);
    ry = clamp(ry + (e.key === 'ArrowLeft' ? -5 : e.key === 'ArrowRight' ? 5 : 0), -32, 32);
    render();
  });
  addEventListener('blur', reset);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { drag = null; cancelAnimationFrame(raf); raf = 0; } });
  reduced.addEventListener('change', reset);
  document.getElementById('catalogGrid').addEventListener('pointermove', e => {
    if (reduced.matches || e.pointerType !== 'mouse') return;
    const card = e.target.closest('.catalog-card'); if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--tilt-x', `${(.5 - (e.clientY-r.top)/r.height)*6}deg`);
    card.style.setProperty('--tilt-y', `${((e.clientX-r.left)/r.width-.5)*8}deg`);
  });
  // Keep the overlay below the actual header height, including wrapped layouts.
  const siteHeader = document.querySelector('.site-header');
  const syncHeaderHeight = () => document.documentElement.style.setProperty('--site-header-height', `${Math.ceil(siteHeader.getBoundingClientRect().height)}px`);
  new ResizeObserver(syncHeaderHeight).observe(siteHeader);
  syncHeaderHeight();
  // Keyboard users can reach both the open panel and the persistent navigation.
  document.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const panel = document.querySelector('.panel-overlay.open'); if (!panel) return;
    const items = [...siteHeader.querySelectorAll('a[href],button:not([disabled]),input'), ...panel.querySelectorAll('button:not([disabled]),a[href],input,textarea,summary,[tabindex="0"]')].filter(x => x.getClientRects().length && getComputedStyle(x).visibility !== 'hidden');
    if (!items.length) return;
    const first = items[0], last = items[items.length-1];
    if (e.shiftKey && (document.activeElement === first || (!panel.contains(document.activeElement) && !siteHeader.contains(document.activeElement)))) {e.preventDefault();last.focus();}
    else if (!e.shiftKey && (document.activeElement === last || (!panel.contains(document.activeElement) && !siteHeader.contains(document.activeElement)))) {e.preventDefault();first.focus();}
  });
})();
