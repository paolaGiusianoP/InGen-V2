import React, { useEffect, useRef, useState } from 'react';
import { edgeLine } from './Edge';

const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';
const NAMES = { concepto: 'El concepto', menu: 'La carta', gallery: 'Galería', reservation: 'Reserva', contact: 'Contacto' };
const LINE = edgeLine(31);

const Jag = ({ flip, className }) => (
  <svg viewBox="0 0 1200 48" preserveAspectRatio="none" aria-hidden="true" className={`h-12 w-full ${className}`} style={flip ? { transform: 'scaleY(-1)' } : undefined}>
    <path d={`${LINE} L1200,48 L0,48 Z`} fill="#1b130d" />
    <path d={LINE} fill="none" stroke="#ff8a3a" strokeWidth="2.5" vectorEffect="non-scaling-stroke" style={{ filter: 'drop-shadow(0 0 8px #ff6a1a)' }} />
  </svg>
);

const goTo = (target, id, behavior) => {
  const y = target ? target.getBoundingClientRect().top + window.scrollY - 72 : 0;
  window.scrollTo({ top: Math.max(0, y), behavior });
  history.replaceState(null, '', id ? `#${id}` : window.location.pathname);
  if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
};

export const PageTransition = () => {
  const box = useRef(null);
  const busy = useRef(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onClick = async (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const target = id ? document.getElementById(id) : null;
      if (id && !target) return;
      e.preventDefault();
      if (busy.current) return;

      const destY = target ? target.getBoundingClientRect().top + window.scrollY - 72 : 0;
      if (Math.abs(destY - window.scrollY) < window.innerHeight * 0.6) return goTo(target, id, 'smooth');

      busy.current = true;
      setLabel(id ? NAMES[id] || a.textContent.trim() : 'InGen Kitchen');
      const el = box.current;
      el.style.visibility = 'visible';
      await el.animate([{ transform: 'translateY(calc(100% + 60px))' }, { transform: 'translateY(0)' }], { duration: 520, easing: EASE, fill: 'forwards' }).finished;
      goTo(target, id, 'instant');
      await new Promise((r) => setTimeout(r, 140));
      await el.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(calc(-100% - 60px))' }], { duration: 620, easing: EASE, fill: 'forwards' }).finished;
      el.style.visibility = 'hidden';
      busy.current = false;
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div ref={box} aria-hidden="true" className="fixed inset-0 z-[95] will-change-transform"
      style={{ visibility: 'hidden', transform: 'translateY(calc(100% + 60px))' }}>
      <div className="wood absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink-950">
        <svg viewBox="0 0 64 64" className="h-12 w-12 text-ember" aria-hidden="true"><path d="M32 6c-9 11-16 19-16 30a16 16 0 0032 0C48 25 41 17 32 6z" fill="currentColor" /></svg>
        <p className="font-hand text-6xl text-slate-100">{label}</p>
      </div>
      <Jag className="absolute bottom-full left-0" />
      <Jag flip className="absolute left-0 top-full" />
    </div>
  );
};
