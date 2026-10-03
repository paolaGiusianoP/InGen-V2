import React from 'react';

export const Polaroid = ({ src, alt = '', caption, tilt = 2, ratio = 'aspect-[4/5]', imgStyle, compact = false, className = '' }) => (
  <figure
    className={`relative bg-[#fbf6ea] p-3 shadow-[0_22px_40px_-14px_rgba(40,20,5,0.6)] ${compact ? 'pb-12' : 'pb-16'} ${className}`}
    style={{ transform: `rotate(${tilt}deg)` }}
  >
    <span aria-hidden="true" className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-3 bg-[#d8bf88]/75 shadow-sm" />
    <img src={src} alt={alt} loading="lazy" style={imgStyle} className={`${imgStyle ? '' : ratio} w-full object-cover sepia-[.2] contrast-105`} />
    {caption && (
      <figcaption className={`absolute inset-x-4 font-hand leading-none text-char ${compact ? 'bottom-3 text-xl' : 'bottom-4 text-2xl'}`}>{caption}</figcaption>
    )}
  </figure>
);
