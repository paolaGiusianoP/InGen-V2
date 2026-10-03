import React, { useEffect, useRef, useState } from 'react';
import { siteData } from '../data/siteData';
import { edgeLine } from './Edge';
import { HERO_IMG } from './HeroRustic';

const LINE = edgeLine(53);
const SPARKS = [
  { l: 18, d: 0, t: 2.2, dx: -14 }, { l: 38, d: 0.6, t: 2.8, dx: 10 }, { l: 55, d: 1.1, t: 2.4, dx: -8 },
  { l: 72, d: 0.3, t: 3, dx: 14 }, { l: 46, d: 1.6, t: 2.6, dx: 4 },
];
const status = (v) =>
  v < 20 ? 'Encendiendo el fuego…' : v < 50 ? 'Juntando las brasas…' : v < 80 ? 'Calentando la parrilla…' : v < 100 ? 'Poniendo la mesa…' : '¡Pasá, está listo!';
const store = {
  get: () => { try { return sessionStorage.getItem('ingen-seen') === '1'; } catch { return false; } },
  set: () => { try { store.set(); } catch { /* modo privado */ } },
};
const preload = (src) => new Promise((res) => { const i = new Image(); i.onload = i.onerror = res; i.src = src; });

const Word = ({ filled }) => (
  <div className="display text-center" style={{ fontSize: 'clamp(4rem, 14vw, 9rem)' }}>
    <div className={filled ? '' : 'text-slate-100/15'}>InGen</div>
    <div className={`-mt-[0.02em] italic font-semibold ${filled ? 'text-ember' : 'text-ember/30'}`} style={{ fontSize: '0.5em' }}>Kitchen</div>
  </div>
);

export const Preloader = ({ onDone, onLift }) => {
  const [pct, setPct] = useState(0);
  const [lift, setLift] = useState(false);
  const cb = useRef({});
  cb.current = { onDone, onLift };

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = 'hidden'; 
    const MIN = store.get() ? 600 : 1900;
    const start = performance.now();
    let loaded = false, p = 0, raf = 0, finished = false;
    const timers = [];

    Promise.race([Promise.all([document.fonts?.ready, preload(HERO_IMG)]), new Promise((r) => setTimeout(r, 4000))])
      .then(() => { loaded = true; });

    const tick = (now) => {
      const t = Math.min(1, (now - start) / MIN);
      p += (Math.min(1 - Math.pow(1 - t, 3), loaded ? 1 : 0.92) - p) * 0.15;
      setPct(Math.round(p * 100));
      if (loaded && t >= 1 && p > 0.985 && !finished) {
        finished = true;
        setPct(100);
        sessionStorage.setItem('ingen-seen', '1');
        timers.push(setTimeout(() => { setLift(true); cb.current.onLift?.(); }, 350));
        timers.push(setTimeout(() => { root.style.overflow = ''; cb.current.onDone?.(); }, 1350));
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); root.style.overflow = ''; };
  }, []);

  return (
    <div
      role="status"
      aria-label="Cargando"
      className="fixed inset-0 z-[100] transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none"
      style={{ transform: lift ? 'translateY(calc(-100% - 60px))' : 'translateY(0)' }}
    >
      <div className="wood absolute inset-0 flex flex-col items-center justify-between bg-ink-950 px-6 py-10 text-slate-100">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-400">{siteData.info.tagline}</p>

        <div className="flex flex-col items-center">
          <div className="relative mb-6 h-16 w-16" aria-hidden="true">
            {SPARKS.map((s, i) => (
              <span key={i} className="spark" style={{ left: `${s.l}%`, bottom: '55%', '--d': `${s.d}s`, '--t': `${s.t}s`, '--dx': `${s.dx}px` }} />
            ))}
            <svg viewBox="0 0 64 64" className="flame-idle relative h-full w-full drop-shadow-[0_0_18px_rgba(230,110,30,0.8)]">
              <defs>
                <linearGradient id="plFlame" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#8f3115" /><stop offset="55%" stopColor="#d2551f" /><stop offset="100%" stopColor="#f2b072" />
                </linearGradient>
              </defs>
              <path d="M32 4c-10 12-18 21-18 33a18 18 0 0036 0C50 25 42 16 32 4z" fill="url(#plFlame)" />
              <path d="M32 26c-5 7-8 11-8 17a8 8 0 0016 0c0-6-3-10-8-17z" fill="#fde7c0" opacity="0.6" />
            </svg>
          </div>

          <div className="relative" aria-hidden="true">
            <Word />
            <div className="absolute inset-0" style={{ clipPath: `inset(${100 - pct}% 0 0 0)`, transition: 'clip-path 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
              <Word filled />
            </div>
          </div>

          <p key={status(pct)} className="card-in mt-6 h-9 font-hand text-3xl text-slate-300">{status(pct)}</p>
        </div>

        <div className="w-full max-w-xs">
          <div className="mb-2 flex justify-between font-mono text-[10px] tracking-[0.3em] text-slate-400">
            <span>PREPARANDO LA MESA</span>
            <span className="tabular-nums text-slate-100">{String(pct).padStart(3, '0')}%</span>
          </div>
          <div className="h-[2px] w-full bg-slate-100/15">
            <div className="h-full bg-ember" style={{ width: `${pct}%`, boxShadow: '0 0 12px 2px rgba(230,110,30,0.7)' }} />
          </div>
        </div>
      </div>

      <svg viewBox="0 0 1200 48" preserveAspectRatio="none" aria-hidden="true" className="absolute left-0 top-full h-12 w-full" style={{ transform: 'scaleY(-1)' }}>
        <path d={`${LINE} L1200,48 L0,48 Z`} fill="#1b130d" />
        <path d={LINE} fill="none" stroke="#ff8a3a" strokeWidth="2.5" vectorEffect="non-scaling-stroke" style={{ filter: 'drop-shadow(0 0 8px #ff6a1a)' }} />
      </svg>
    </div>
  );
};
