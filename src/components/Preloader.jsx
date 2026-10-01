import React, { useEffect, useState } from 'react';
import { siteData } from '../data/siteData';

export const Preloader = ({ onDone, onLift }) => {
  const [phase, setPhase] = useState('active'); 
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const DURATION = 2200;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / DURATION);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPct(Math.round(eased * 100));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t1 = setTimeout(() => setPhase('ready'), DURATION + 150);
    const t2 = setTimeout(() => {
      setPhase('lift');
      onLift?.();
    }, DURATION + 650);
    const t3 = setTimeout(() => {
  onDone?.();

  const hero = document.getElementById('hero');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (hero && !reduced) {
    const spark = document.createElement('div');
    spark.className = 'spark-flyer';
    spark.style.left = '50%';
    spark.style.top = '50%';
    document.body.appendChild(spark);

    spark.animate(
      [
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(3)', opacity: 0.6, offset: 0.5 },
        { transform: 'translate(-50%, 30vh) scale(0)', opacity: 0 },
      ],
      {
        duration: 1200,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    ).onfinish = () => spark.remove();
  }
}, DURATION + 1650);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone, onLift]);

  const statusText = (v) => {
    if (v < 15) return 'Encendiendo el fuego';
    if (v < 45) return 'Calibrando las brasas';
    if (v < 75) return 'Preparando la parrilla';
    if (v < 100) return 'Temperatura óptima';
    return 'Listo para servir';
  };

  const fireIntensity = pct / 100;

  return (
    <div
      aria-hidden="true"
      className={`
        fixed inset-0 z-[100] overflow-hidden
        bg-[#0a0f0d] text-slate-100
        transition-transform duration-[1100ms]
        ease-[cubic-bezier(0.76,0,0.24,1)]
        ${phase === 'lift' ? '-translate-y-full' : 'translate-y-0'}
      `}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700"
        style={{
          background: `radial-gradient(circle,
            rgba(245,158,11,${0.15 + fireIntensity * 0.35}) 0%,
            rgba(180,83,9,${0.08 + fireIntensity * 0.2}) 40%,
            transparent 72%)`,
          transform: `translate(-50%, -50%) scale(${0.6 + fireIntensity * 0.5})`,
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-grain opacity-30" />

      {/* Contenido */}
      <div className="relative z-10 flex h-full select-none flex-col items-center justify-between px-6 py-10">

        <div className="my-auto flex flex-col items-center">

          {/* Ícono del fuego */}
          <div className="relative mb-10 flex h-32 w-32 items-center justify-center">
            {/* Aura exterior */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-500"
              style={{
                background: `radial-gradient(circle, rgba(245,158,11,${fireIntensity * 0.5}) 0%, transparent 65%)`,
                filter: 'blur(20px)',
              }}
            />

            {/* Anillo giratorio */}
            <div
              className="absolute inset-4 rounded-full border border-amber-500/30"
              style={{
                animation: 'spin 12s linear infinite',
              }}
            >
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.9)]" />
            </div>

            {/* SVG de llama */}
            <svg
              viewBox="0 0 64 64"
              className="relative z-10 h-16 w-16 transition-transform duration-500"
              style={{
                transform: `scale(${0.85 + fireIntensity * 0.25})`,
              }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="fireGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fef3c7" />
                </linearGradient>
              </defs>
              {/* Llama exterior */}
              <path
                d="M32 4
                   C 20 18, 12 28, 12 40
                   C 12 52, 22 60, 32 60
                   C 42 60, 52 52, 52 40
                   C 52 28, 44 18, 32 4 Z"
                fill="url(#fireGrad)"
                style={{
                  opacity: 0.15 + fireIntensity * 0.85,
                  transition: 'opacity 0.4s',
                }}
              />
              {/* Llama interior */}
              <path
                d="M32 20
                   C 26 30, 22 36, 22 44
                   C 22 52, 26 56, 32 56
                   C 38 56, 42 52, 42 44
                   C 42 36, 38 30, 32 20 Z"
                fill="#fef3c7"
                style={{
                  opacity: Math.max(0, (fireIntensity - 0.3) / 0.7),
                  transition: 'opacity 0.4s',
                }}
              />
            </svg>
          </div>

          <div className="relative mt-4 select-none">
            <h1
              className="font-serif leading-none tracking-[-0.03em] text-slate-800"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
            >
              InGen <span className="italic">Kitchen</span>
            </h1>

            <h1
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-slate-100 via-amber-400 to-amber-600 bg-clip-text font-serif leading-none tracking-[-0.03em] text-transparent"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                clipPath: `inset(${100 - pct}% 0 0 0)`,
                transition: 'clip-path 0.35s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              InGen <span className="italic">Kitchen</span>
            </h1>
          </div>

          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.4em] text-amber-500/70">
            {siteData.info.tagline}
          </p>

          {/* Estado */}
          <p className="mt-6 h-4 font-mono text-[10px] uppercase tracking-[0.35em] text-slate-400">
            {statusText(pct)}
          </p>
        </div>

        {/* BARRA DE PROGRESO */}
        <div className="w-full max-w-xs pb-2">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.3em] text-slate-500">
              PREPARANDO LA COCINA
            </span>
            <span className="font-mono text-[10px] font-semibold tabular-nums tracking-widest text-slate-100">
              {String(pct).padStart(3, '0')}%
            </span>
          </div>

          <div className="h-[2px] w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-300 transition-all duration-100 ease-out"
              style={{
                width: `${pct}%`,
                boxShadow: `0 0 ${fireIntensity * 15}px rgba(245,158,11,${fireIntensity * 0.8})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};