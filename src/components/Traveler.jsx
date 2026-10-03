import React, { useEffect, useRef } from 'react';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

export const STOPS = [
  { id: 'hero', at: 0.0, x: null, y: null, s: 1.0, r: -4 },
  { id: 'hero', at: 0.3, x: 0.5, y: 0.5, s: 1.6, r: 8 },
  { id: 'hero', at: 1.0, x: 0.86, y: 0.8, s: 0.9, r: -6 },
  { id: 'concepto', x: 0.06, y: 0.8, s: 0.7, r: 6 },
  { id: 'menu', x: 0.94, y: 0.72, s: 0.7, r: -8 },
  { id: 'gallery', x: 0.06, y: 0.8, s: 0.7, r: 6 },
  { id: 'reservation', x: 0.94, y: 0.5, s: 0.7, r: -6 },
  { id: 'contact', x: 0.5, y: 0.16, s: 0.8, r: 0 },
];

const SIZE = 96;

export const FlameMascot = () => (
  <svg viewBox="0 0 64 64" className="flame-idle h-full w-full drop-shadow-[0_0_18px_rgba(245,158,11,0.75)]" aria-hidden="true">
    <defs>
      <linearGradient id="trvGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#b45309" />
        <stop offset="55%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#fde68a" />
      </linearGradient>
    </defs>
    <path d="M32 3C20 17 11 28 11 41c0 12 9 20 21 20s21-8 21-20C53 28 44 17 32 3Z" fill="url(#trvGrad)" />
    <path d="M32 22c-6 9-10 15-10 22 0 7 4 11 10 11s10-4 10-11c0-7-4-13-10-22Z" fill="#fef3c7" opacity="0.55" />
    <rect x="17" y="36" width="12" height="8" rx="3.5" fill="#120d08" />
    <rect x="35" y="36" width="12" height="8" rx="3.5" fill="#120d08" />
    <path d="M29 39.5h6" stroke="#120d08" strokeWidth="2" />
    <path d="M20 38.5l3-1.2M38 38.5l3-1.2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <path d="M26 50q6 5 12 0" stroke="#120d08" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

export const Traveler = ({ stops = STOPS, ready = true, mouseMode = 'always', children }) => {
  const node = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = node.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches && mouseMode !== 'off';
    let vw = 0, vh = 0, maxR = 0;
    let pts = [];
    let heroTop = 0, heroH = 1;
    let running = false, raf = 0, first = true;
    const cur = { x: 0, y: 0, s: 1, r: 0 };
    const mouse = { x: 0, y: 0, active: false, down: false, hot: false, field: false };
    let lastMx = 0, lastMy = 0, speed = 0, hold = 0, mR = 0;

    const measure = () => {
      vw = window.innerWidth; vh = window.innerHeight;
      maxR = Math.hypot(vw, vh) * 1.25;
      pts = stops
        .map((st) => {
          const sec = document.getElementById(st.id);
          if (!sec) return null;
          const top = sec.getBoundingClientRect().top + window.scrollY;
          const h = sec.offsetHeight;
          const sy = st.at !== undefined ? top + st.at * Math.max(1, h - vh) : top + h / 2 - vh / 2;
          return { ...st, sy };
        })
        .filter(Boolean)
        .sort((a, b) => a.sy - b.sy);
      const hero = document.getElementById('hero');
      if (hero) { heroTop = hero.getBoundingClientRect().top + window.scrollY; heroH = hero.offsetHeight; }
    };

    const anchorPos = () => {
      const a = document.getElementById('flame-anchor');
      if (!a) return { x: vw * 0.5, y: vh * 0.4 };
      const r = a.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };

    const pathTarget = (y) => {
      let i = 0;
      while (i < pts.length - 1 && y >= pts[i + 1].sy) i++;
      const a = pts[i], b = pts[Math.min(i + 1, pts.length - 1)];
      const t = a === b ? 0 : smooth(clamp((y - a.sy) / (b.sy - a.sy || 1)));
      const pa = a.x === null ? anchorPos() : { x: a.x * vw, y: a.y * vh };
      const pb = b.x === null ? anchorPos() : { x: b.x * vw, y: b.y * vh };
      return { x: lerp(pa.x, pb.x, t), y: lerp(pa.y, pb.y, t), s: lerp(a.s, b.s, t), r: lerp(a.r, b.r, t) };
    };

    const tick = () => {
      if (!pts.length) { running = false; return; }
      const y = window.scrollY;
      const heroP = clamp((y - heroTop) / Math.max(1, heroH - vh));
      const burn = smooth(clamp((heroP - 0.3) / 0.65));
      const mob = vw < 768 ? 0.65 : 1;

      const useMouse = fine && mouse.active && (mouseMode === 'always' || heroP < 1);
      const tg = useMouse
        ? { x: mouse.x, y: mouse.y, s: lerp(1, 0.55, heroP) * (mouse.hot ? 1.25 : 1) * (mouse.field ? 0.6 : 1), r: 0 }
        : pathTarget(y);
      if (first) { Object.assign(cur, tg); first = false; }

      const k = useMouse ? 0.24 : 0.14;
      const dx = tg.x - cur.x, dy = tg.y - cur.y;
      cur.x += dx * k; cur.y += dy * k;
      cur.s += (tg.s - cur.s) * k; cur.r += (tg.r - cur.r) * k;

      const tilt = clamp(dx * 0.06, -16, 16);
      el.style.transform = `translate3d(${cur.x - SIZE / 2}px, ${cur.y - SIZE / 2}px, 0) rotate(${cur.r + tilt}deg) scale(${cur.s * mob})`;

      const mv = Math.hypot(mouse.x - lastMx, mouse.y - lastMy);
      lastMx = mouse.x; lastMy = mouse.y;
      speed += (mv - speed) * 0.15;
      const holdT = mouse.down && useMouse ? 1 : 0;
      hold += (holdT - hold) * 0.06;
      const rt = useMouse && heroP < 0.98 ? (110 + clamp(speed * 5, 0, 110) + hold * 240) * mob : 0;
      mR += (rt - mR) * 0.12;

      const br = Math.max(burn * maxR, mR);
      const b = br / maxR;
      root.style.setProperty('--fx', `${cur.x}px`);
      root.style.setProperty('--fy', `${cur.y}px`);
      root.style.setProperty('--br', `${br}px`);
      root.style.setProperty('--rimo', String(clamp(b * 20) * clamp((1 - b) * 8)));
      root.dataset.paper = b < 0.35 ? 'light' : 'dark';
      root.classList.toggle('spark-cursor', useMouse && heroP < 0.85);

      const busy = Math.abs(dx) + Math.abs(dy) > 0.3 || Math.abs(rt - mR) > 0.5 || speed > 0.2 || Math.abs(holdT - hold) > 0.01;
      if (busy) raf = requestAnimationFrame(tick);
      else running = false;
    };
    const kick = () => { if (!running) { running = true; raf = requestAnimationFrame(tick); } };

    if (reduced) {
      measure();
      root.style.setProperty('--br', `${Math.hypot(vw, vh) * 1.25}px`);
      root.style.setProperty('--rimo', '0');
      root.dataset.paper = 'dark';
      el.style.display = 'none';
      return;
    }

    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      if (!mouse.active) { lastMx = e.clientX; lastMy = e.clientY; }
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
      const t = e.target;
      mouse.hot = !!t.closest?.('a, button, [role="button"], summary');
      mouse.field = !!t.closest?.('input, textarea, select, iframe');
      kick();
    };
    const onLeave = () => { mouse.active = false; mouse.down = false; kick(); };
    const onDown = (e) => { if (e.pointerType !== 'touch') { mouse.down = true; kick(); } };
    const onUp = () => { mouse.down = false; kick(); };
    const remeasure = () => { measure(); kick(); };

    remeasure();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', remeasure);
    if (fine) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      document.addEventListener('mouseleave', onLeave);
      window.addEventListener('blur', onLeave);
    }
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', remeasure);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      ro.disconnect();
      root.classList.remove('spark-cursor');
      delete root.dataset.paper;
    };
  }, [stops, mouseMode]);

  return (
    <div
      ref={node}
      aria-hidden="true"
      style={{ width: SIZE, height: SIZE }}
      className={`pointer-events-none fixed left-0 top-0 z-30 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
    >
      {children || <FlameMascot />}
    </div>
  );
};
