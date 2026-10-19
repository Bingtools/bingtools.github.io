/* Background-only brightness: keep text and media legible, no full-page filter. */
(() => {
  'use strict';
  const key = 'bingo-sketch-background-brightness';
  const control = document.getElementById('brightnessControl');
  const trigger = document.getElementById('brightnessOpen');
  const panel = document.getElementById('brightnessPanel');
  const range = document.getElementById('brightnessRange');
  const value = document.getElementById('brightnessValue');
  const hint = document.getElementById('brightnessHint');
  const palettes = {
    // Stops at 10%, 60%, 100%; preserve existing saved settings at 60–100%.
    '--paper': [[130, 128, 120], [181, 179, 171], [245, 243, 237]],
    '--sheet': [[147, 145, 135], [199, 197, 187], [255, 254, 249]],
    '--soft': [[113, 111, 102], [162, 161, 151], [233, 231, 223]],
    '--line': [[88, 87, 77], [128, 127, 117], [197, 196, 186]],
    '--ink': [[10, 11, 9], [41, 42, 39], [41, 42, 39]],
    '--muted': [[20, 21, 17], [64, 65, 58], [105, 106, 98]],
    '--red': [[79, 24, 14], [124, 49, 34], [165, 74, 56]]
  };
  function apply(raw, persist = false) {
    const parsed = Number(raw);
    const level = Number.isFinite(parsed) ? Math.round(Math.max(10, Math.min(100, parsed))) : 100;
    const blend = level < 60 ? (level - 10) / 50 : (level - 60) / 40;
    for (const [name, stops] of Object.entries(palettes)) {
      const [low, high] = level < 60 ? stops.slice(0, 2) : stops.slice(1);
      const rgb = low.map((v, i) => Math.round(v + (high[i] - v) * blend));
      document.documentElement.style.setProperty(name, `rgb(${rgb.join(', ')})`);
    }
    range.value = String(level);
    range.setAttribute('aria-valuetext', `${level}%`);
    value.textContent = `${level}%`;
    if (persist) {
      try { localStorage.setItem(key, String(level)); }
      catch { hint.textContent = '此浏览器无法保存，当前页面仍可调节'; }
    }
  }
  function close(restoreFocus = false) {
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus({ preventScroll: true });
  }
  trigger.addEventListener('click', () => {
    const opening = panel.hidden;
    panel.hidden = !opening;
    trigger.setAttribute('aria-expanded', String(opening));
    if (opening) range.focus({ preventScroll: true });
  });
  document.getElementById('brightnessClose').addEventListener('click', () => close(true));
  range.addEventListener('input', () => apply(range.value, true));
  document.getElementById('brightnessReset').addEventListener('click', () => apply(100, true));
  document.addEventListener('pointerdown', event => {
    if (!panel.hidden && !control.contains(event.target)) close();
  });
  control.addEventListener('focusout', event => {
    if (event.relatedTarget && !control.contains(event.relatedTarget)) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      event.preventDefault();
      event.stopImmediatePropagation();
      close(true);
    }
  }, true);
  try { apply(localStorage.getItem(key) ?? 100); }
  catch { apply(100); hint.textContent = '此浏览器无法保存，当前页面仍可调节'; }
})();
