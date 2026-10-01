export const useSparkTrail = () => {
  const createParticles = (x, y, count = 3) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'spark-particle';
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;

      const angle = Math.random() * Math.PI * 2;
      const dist = 20 + Math.random() * 60;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 30;

      p.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`, opacity: 0 },
        ],
        {
          duration: 600 + Math.random() * 400,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }
      ).onfinish = () => p.remove();

      document.body.appendChild(p);
    }
  };

  return { createParticles };
};