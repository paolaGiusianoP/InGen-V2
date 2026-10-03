import React, { useRef } from 'react';
import { useEdgeProgress } from '../hooks/useScrollVar';

const mk = (seed, n = 70, amp = 11) => {
  let s = seed;
  const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: n + 1 }, (_, i) => [(i / n) * 1200, 24 + (r() - 0.5) * amp * 2 + Math.sin(i * 0.6) * 6]);
};
export const edgeLine = (seed) => mk(seed).map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(0)},${y.toFixed(1)}`).join(' ');

const SPARKS = [6, 17, 28, 39, 51, 62, 73, 84, 94].map((l, i) => ({ l, d: (i * 0.7) % 3, t: 2.4 + (i % 4) * 0.6, dx: (i % 2 ? 1 : -1) * (8 + (i % 3) * 8) }));

export const Edge = ({ fill, burn = false, seed = 7 }) => {
  const ref = useRef(null);
  useEdgeProgress(ref);
  const line = edgeLine(seed);
  return (
    <div ref={ref} aria-hidden="true" className="edge pointer-events-none absolute bottom-[calc(100%-1px)] left-0 z-10 h-10 w-full sm:h-12">
      <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full"
        style={burn ? undefined : { filter: 'drop-shadow(0 -3px 4px rgba(40,20,5,0.35))' }}>
        <path d={`${line} L1200,48 L0,48 Z`} fill={fill} />
        {burn && (
          <path d={line} fill="none" stroke="#ff8a3a" strokeWidth="2" vectorEffect="non-scaling-stroke" className="edge-rim"
            style={{ filter: 'drop-shadow(0 0 5px #ff6a1a)', opacity: 'calc(0.35 + var(--e, 1) * 0.65)' }} />
        )}
      </svg>
      {burn && SPARKS.map((s, i) => (
        <span key={i} className="spark" style={{ left: `${s.l}%`, '--d': `${s.d}s`, '--t': `${s.t}s`, '--dx': `${s.dx}px` }} />
      ))}
    </div>
  );
};
