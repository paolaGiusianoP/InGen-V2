import React from 'react';
import { siteData } from '../data/siteData';

const CREAM = '#f3ead9';
const DIM = 'rgba(243, 234, 217, 0.22)'; 

const MASK_ON = 'radial-gradient(circle at var(--fx, 50%) var(--fy, 50%), #000 calc(var(--br, 0px) - 60px), transparent var(--br, 0px))';
const MASK_OFF = 'radial-gradient(circle at var(--fx, 50%) var(--fy, 50%), transparent calc(var(--br, 0px) - 60px), #000 var(--br, 0px))';

const HeroText = ({ illuminated, whatsappUrl }) => {
  const Word = illuminated ? 'h1' : 'div';
  return (
    <div
      aria-hidden={illuminated ? undefined : 'true'}
      inert={illuminated ? undefined : ''}
      className={`absolute inset-0 flex flex-col px-8 pb-10 pt-28 lg:px-14 ${illuminated ? '' : 'pointer-events-none'}`}
      style={{
        color: illuminated ? CREAM : DIM,
        WebkitMaskImage: illuminated ? MASK_ON : MASK_OFF,
        maskImage: illuminated ? MASK_ON : MASK_OFF,
      }}
    >
      <div className="pointer-events-none absolute inset-4 border border-current opacity-20 lg:inset-6" />

      <div className="hero-in flex items-center justify-between gap-4 border-b border-current/20 pb-4" style={{ '--d': '100ms' }}>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.35em]">{siteData.info.tagline}</span>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] opacity-70 sm:inline">{siteData.info.address}</span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <Word
          className="font-serif leading-[0.8] tracking-[-0.05em]"
          style={{ fontSize: 'clamp(5rem, min(26vw, 40vh), 30rem)' }}
        >
          <span className="line-mask">
            <span style={{ '--d': '250ms' }}>
              InGe
              <span className="relative inline-block">
                n
                {illuminated && (
                  <span id="flame-anchor" aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 h-[0.25em] w-[0.25em] -translate-x-1/2 -translate-y-1/2"
                    style={{ top: '0.17em' }} />
                )}
              </span>
            </span>
          </span>
        </Word>
        <p className="line-mask -mt-[1.5vh] font-serif italic" style={{ fontSize: 'clamp(1.75rem, min(6vw, 9vh), 5rem)' }}>
          <span style={{ '--d': '450ms' }}>Kitchen</span>
        </p>
      </div>

      <div className="hero-in grid items-end gap-6 md:grid-cols-3" style={{ '--d': '700ms' }}>
        <p className="max-w-xs font-sans text-sm leading-relaxed opacity-80">{siteData.info.subtitle}</p>
        <div className="hidden flex-col items-center gap-2 md:flex">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-60">
            <span className="[@media(pointer:fine)]:hidden">Scrolleá</span>
            <span className="hidden [@media(pointer:fine)]:inline">Mové la chispa · scrolleá</span>
          </span>
          <span className="relative h-8 w-px overflow-hidden bg-current opacity-30">
            <span className="absolute inset-x-0 top-0 h-3 bg-current" style={{ animation: 'scrollHint 2s ease-in-out infinite' }} />
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" tabIndex={illuminated ? undefined : -1}
            className="rounded-full border border-current px-7 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-60">
            Reservar mesa →
          </a>
          <a href="#menu" tabIndex={illuminated ? undefined : -1}
            className="px-4 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] opacity-70 transition-opacity hover:opacity-100">
            Ver carta
          </a>
        </div>
      </div>
    </div>
  );
};

export default function HeroV3({ ready = true }) {
  const whatsappUrl = `https://wa.me/${siteData.info.whatsappNumber}?text=${encodeURIComponent(
    'Hola! Quisiera reservar una mesa en InGen Kitchen.'
  )}`;

  return (
    <section id="hero" data-ready={ready} className="relative h-[240vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroText whatsappUrl={whatsappUrl} />
        <HeroText illuminated whatsappUrl={whatsappUrl} />
      </div>
    </section>
  );
}