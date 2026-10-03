import React from 'react';

const MASK = 'radial-gradient(circle at var(--fx, 50%) var(--fy, 50%), #000 calc(var(--br, 0px) - 60px), transparent var(--br, 0px))';

const RIM = 'radial-gradient(circle at var(--fx, 50%) var(--fy, 50%), transparent calc(var(--br, 0px) - 140px), rgba(255,150,30,0.45) calc(var(--br, 0px) - 60px), rgba(255,190,80,0.25) calc(var(--br, 0px) - 20px), transparent calc(var(--br, 0px) + 20px))';

const AMBIENT = 'radial-gradient(ellipse 60% 70% at 50% 45%, rgba(243,234,217,0.08) 0%, rgba(245,158,11,0.06) 40%, transparent 70%)';

const CSS = `
@keyframes flameIdle { 0%,100% { transform: scale(1,1); } 50% { transform: scale(1.04,0.96) rotate(-2deg); } }
.flame-idle { animation: flameIdle 1.6s ease-in-out infinite; transform-origin: 50% 100%; }

header { color: #f3ead9; }
header a, header a span { color: #f3ead9 !important; }

html.spark-cursor, html.spark-cursor body { cursor: none; }
html.spark-cursor a, html.spark-cursor button, html.spark-cursor summary { cursor: pointer; }

@media (prefers-reduced-motion: reduce) { .flame-idle { animation: none; } }
`;

export const BurnBackground = () => (
  <>
    <style>{CSS}</style>
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden"
      style={{
        background: '#0a0f0d',
      }}
    >
      <div className="absolute inset-0" style={{ background: AMBIENT }} />

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, #fdf2d9 0%, #f5d99b 40%, #c9862d 70%, #6b3a0f 100%)',
          WebkitMaskImage: MASK,
          maskImage: MASK,
        }}
      />

      <div
        className="absolute inset-0"
        style={{ background: RIM, opacity: 'var(--rimo, 0)' }}
      />
    </div>
  </>
);