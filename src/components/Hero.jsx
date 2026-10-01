import React, { useRef } from 'react';
import { useHeroScroll } from '../hooks/useHeroScroll';
import { siteData } from '../data/siteData';
import { EmbersCanvas } from './EmbersCanvas';

export default function Hero({ ready = true }) {
  const ref = useRef(null);
  useHeroScroll(ref);

  const whatsappUrl = `https://wa.me/${siteData.info.whatsappNumber}?text=${encodeURIComponent(
    'Hola! Quisiera reservar una mesa en InGen Kitchen.'
  )}`;

  const isOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours() + now.getMinutes() / 60;

    if (day >= 2 && day <= 4) return hour >= 19.5 || hour < 0.5;
    if (day === 5 || day === 6) return hour >= 19.5 || hour < 1.5;
    if (day === 0) return hour >= 12.5 && hour < 16;
    return false;
  };

  const open = isOpen();

  return (
    <section
      ref={ref}
      id="hero"
      data-ready={ready}
      className="relative w-full h-screen min-h-[700px] flex items-end overflow-hidden bg-[#0a0f0d]"
    >
      {/* FOTO DE FONDO */}
      <div className="hero-bg absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2400&auto=format&fit=crop"
          alt="InGen Kitchen"
          className="kenburns h-full w-full object-cover object-center opacity-75"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,15,13,0.95) 0%, rgba(10,15,13,0.55) 40%, rgba(10,15,13,0.98) 100%)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 20% 50%, rgba(10,15,13,0.65) 0%, transparent 60%)',
          }}
        />

        <div
          className="absolute inset-0 bg-[#0a0f0d]/40"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      {/* BRASAS 3D */}
      <EmbersCanvas className="absolute inset-0 z-[5]" />

      <div
        className="pointer-events-none absolute inset-0 z-[6]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(10,15,13,0.55) 100%)',
        }}
      />

      {/* CONTENIDO */}
      <div className="hero-content relative z-10 w-full mx-auto max-w-[1400px] px-6 pb-32 lg:px-12 lg:pb-40">
        <div className="max-w-3xl space-y-8">
          <div className="hero-in flex items-center gap-3" style={{ '--d': '100ms' }}>
            <span className="h-px w-10 bg-amber-500" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-500">
              {siteData.info.tagline}
            </span>
          </div>

          <h1
            className="font-serif leading-[0.9] tracking-[-0.03em] text-slate-50"
            style={{
              fontSize: 'clamp(3rem, 9vw, 9rem)',
              filter: 'drop-shadow(0 4px 30px rgba(0,0,0,0.7))',
            }}
          >
            <span className="line-mask"><span style={{ '--d': '250ms' }}>InGen</span></span>{' '}
            <span className="line-mask italic text-slate-300"><span style={{ '--d': '400ms' }}>Kitchen</span></span>
          </h1>

          <p className="hero-in max-w-xl font-sans text-base leading-relaxed text-slate-300 sm:text-lg" style={{ '--d': '600ms' }}>
            {siteData.info.subtitle}
          </p>

          <div className="hero-in flex flex-col gap-3 pt-2 sm:flex-row sm:items-center" style={{ '--d': '750ms' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber-500 px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-slate-950 transition-all hover:bg-amber-400 hover:shadow-[0_10px_40px_-10px_rgba(245,158,11,0.6)]"
            >
              Reservar mesa
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-600/50 bg-slate-950/40 px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-slate-200 backdrop-blur-sm transition-all hover:border-amber-500/60 hover:text-amber-500"
            >
              Ver carta
            </a>
          </div>
        </div>
      </div>

      {/* BARRA INFERIOR */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-amber-900/30 bg-[#0a0f0d]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">
            <span className="flex items-center gap-2">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  open ? 'animate-pulse bg-emerald-400' : 'bg-rose-500'
                }`}
              />
              <span className={open ? 'text-emerald-400' : 'text-rose-400'}>
                {open ? 'Abierto ahora' : 'Cerrado'}
              </span>
            </span>
            <span className="hidden sm:inline">{siteData.info.hours[0].days} · {siteData.info.hours[0].time}</span>
            <span className="hidden lg:inline">{siteData.info.hours[1].days} · {siteData.info.hours[1].time}</span>
          </div>

          <a
            href={`https://instagram.com/${siteData.info.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 transition-colors hover:text-amber-500"
          >
            {siteData.info.instagram} ↗
          </a>
        </div>
      </div>
    </section>
  );
}