import { useEffect } from 'react';

export const useMeniscus = (ref, ratio = 0.09) => {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = window.innerWidth * ratio;
      const c = Math.min(max, Math.max(0, el.getBoundingClientRect().top * 0.2));
      el.style.borderRadius = `50% 50% 0 0 / ${c}px ${c}px 0 0`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, ratio]);
};
