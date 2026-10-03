import React, { useRef } from 'react';
import { siteData } from '../data/siteData';
import { Polaroid } from './Polaroid';
import { useHeroP } from '../hooks/useScrollVar';

export const HERO_IMG = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000';

const isOpen = () => {
  const n = new Date(), d = n.getDay(), h = n.getHours() + n.getMinutes() / 60;
  if (d >= 2 && d <= 4) return h >= 19.5 || h < 0.5;
  if (d === 5 || d === 6) return h >= 19.5 || h < 1.5;
  if (d === 0) return h >= 12.5 && h < 16;
  return false;
};

const Seal = ({ className = '' }) => (
  <div className={`rounded-full bg-paper shadow-lg ${className}`}>
    <svg viewBox="0 0 120 120" className="h-full w-full animate-[spin_40s_linear_infinite] text-ember" aria-hidden="true">
      <defs><path id="sealPath" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
      <text fontSize="9" fontWeight="700" fill="currentColor" fontFamily="Courier Prime, monospace">
        <textPath href="#sealPath" textLength="272" lengthAdjust="spacing">FUEGO · MADERA · MADURACIÓN · 45 DÍAS ·</textPath>
      </text>
      <path d="M60 42c-8 10-13 16-13 24a13 13 0 0026 0c0-8-5-14-13-24z" fill="currentColor" />
    </svg>
  </div>
);

const TAPE = ['Fuego', 'Madera', 'Maduración', 'Carnes prime', 'Coctelería de autor', 'Brasas de quebracho'];
const Row = ({ hidden }) => (
  <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-8 pr-8">
    {TAPE.map((t) => (
      <React.Fragment key={t}><span>{t}</span><span className="text-amber-400">✦</span></React.Fragment>
    ))}
  </div>
);
const Marquee = () => (
  <div className="relative z-[5] -mx-4 -rotate-[1.2deg] overflow-hidden bg-char py-3 text-paper shadow-lg">
    <div className="marquee flex w-max font-mono text-xs font-bold uppercase tracking-[0.3em]"><Row /><Row hidden /></div>
  </div>
);

export default function HeroRustic({ ready = true }) {
  const { info } = siteData;
  const ref = useRef(null);
  useHeroP(ref);
  const open = isOpen();
  const wa = `https://wa.me/${info.whatsappNumber}?text=${encodeURIComponent('Hola! Quisiera reservar una mesa en InGen Kitchen.')}`;
  const btn = 'border-2 border-char px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-colors';

  return (
    <section ref={ref} data-ready={ready} className="paper relative flex min-h-screen flex-col pt-28 text-char">
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pb-10 sm:px-12">
        <div className="grid w-full items-center gap-16 lg:grid-cols-12">
          <div className="hero-text lg:col-span-7">
            <p className="hero-in -rotate-2 font-hand text-3xl text-ember" style={{ '--d': '100ms' }}>{info.tagline}</p>

            <h1 className="display mt-2" style={{ fontSize: 'clamp(5.5rem, 17vw, 14rem)' }}>
              <div><span className="line-mask -mr-[0.08em] pr-[0.08em]"><span style={{ '--d': '250ms' }}>InGen</span></span></div>
              <div className="-mt-[0.02em]" style={{ fontSize: '0.5em' }}>
                <span className="line-mask -mr-[0.15em] pr-[0.15em] font-semibold italic text-ember"><span style={{ '--d': '450ms' }}>Kitchen</span></span>
              </div>
            </h1>

            <p className="hero-in mt-8 max-w-md font-sans text-lg leading-relaxed text-char/80" style={{ '--d': '650ms' }}>{info.subtitle}</p>

            <div className="hero-in mt-9 flex flex-wrap items-center gap-4" style={{ '--d': '800ms' }}>
              <a href={wa} target="_blank" rel="noopener noreferrer" className={`${btn} bg-char text-paper hover:border-ember hover:bg-ember`}>Reservar mesa →</a>
              <a href="#menu" className={`${btn} hover:bg-char hover:text-paper`}>Ver la carta</a>
            </div>

            <div className="hero-in mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-dashed border-char/30 pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-char/70" style={{ '--d': '950ms' }}>
              <span className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${open ? 'animate-pulse bg-emerald-600' : 'bg-ember'}`} />
                {open ? 'Abierto ahora' : 'Cerrado ahora'}
              </span>
              <span>{info.hours[0].days} · {info.hours[0].time}</span>
              <span className="hidden xl:inline">{info.address}</span>
            </div>
          </div>

          {/* Collage de fotos */}
          <div className="hero-in relative mx-auto w-full max-w-md lg:col-span-5" style={{ '--d': '500ms' }}>
            <div className="hero-photo">
              <Polaroid
                src={HERO_IMG}
                alt="Costillas a la parrilla"
                caption="Tomahawk a leña de quebracho"
                tilt={3}
                imgStyle={{ height: 'min(50vh, 500px)' }}
              />
            </div>
            <Seal className="hero-seal absolute -left-8 -top-10 h-32 w-32 sm:-left-14" />
            <p className="absolute -right-2 -bottom-14 hidden -rotate-3 items-end gap-1 font-hand text-2xl text-ember lg:flex" aria-hidden="true">
              <svg viewBox="0 0 80 50" className="h-10 w-14 -scale-y-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 45C25 45 55 30 70 5M62 6l8-1 2 9" />
              </svg>
              ¡para compartir!
            </p>
          </div>
        </div>
      </div>
      <div className="pb-16"><Marquee /></div>
    </section>
  );
}
