import { useEffect } from 'react';

const clamp = (v) => Math.min(1, Math.max(0, v));
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const useRaf = (ref, compute) =>
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    const update = () => { raf = 0; compute(el); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [ref]);

export const useHeroP = (ref) =>
  useRaf(ref, (el) => el.style.setProperty('--p', clamp(window.scrollY / el.offsetHeight).toFixed(3)));

export const useEdgeProgress = (ref) => {
  useEffect(() => { if (ref.current && reduced()) ref.current.style.setProperty('--e', '1'); }, [ref]);
  useRaf(ref, (el) => {
    const top = el.parentElement.getBoundingClientRect().top;
    const vh = window.innerHeight;
    el.style.setProperty('--e', clamp((vh - top) / (vh * 0.55)).toFixed(3));
  });
};
