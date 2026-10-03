import React, { useEffect, useState } from 'react';
import { siteData } from '../data/siteData';

export const WhatsAppFloat = () => {
  const [visible, setVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${siteData.info.whatsappNumber}?text=${encodeURIComponent(
    'Hola! Quisiera consultar disponibilidad en InGen Kitchen.'
  )}`;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Aparece tras scrollear 300px
      setVisible(y > 300);

      // Se oculta 220px antes del final para no tapar el footer
      setAtBottom(docHeight > 0 && y > docHeight - 220);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const show = visible && !atBottom;

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-40 flex flex-col items-end
        transition-all duration-500 ease-out
        md:bottom-8 md:right-8
        ${show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-8 opacity-0'
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          mb-3 hidden w-64 rounded-2xl border border-amber-500/20 bg-[#1b130d]/95 p-4
          text-slate-100 shadow-2xl backdrop-blur-md
          transition-all duration-300 md:block
          ${isHovered
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2 opacity-0'
          }
        `}
      >
        <div className="flex items-center gap-2 border-b border-amber-900/30 pb-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <p className="font-mono text-[9px] font-semibold uppercase tracking-widest text-amber-500">
            Reservas abiertas
          </p>
        </div>
        <p className="mt-2.5 font-serif text-xs italic leading-relaxed text-slate-300">
          "Escribinos y te confirmamos disponibilidad al instante."
        </p>
        <p className="mt-2 font-mono text-[8px] uppercase tracking-wider text-amber-700">
          Tocá para abrir chat
        </p>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="
          group relative flex items-center gap-3 rounded-full
          bg-[#25D366] px-4 py-3.5 text-slate-950
          shadow-[0_10px_30px_rgba(37,211,102,0.3)]
          transition-all duration-300
          hover:scale-105 hover:bg-[#22c35e] hover:shadow-[0_15px_35px_rgba(37,211,102,0.5)]
        "
      >
        {/* Anillo pulsante */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-[#25D366]/40"
          style={{ animation: 'whatsappPulse 2.5s ease-out infinite' }}
        />

        {/* Ícono WhatsApp */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>

        {/* Label */}
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-slate-950">
          Reservar
        </span>
      </a>
    </div>
  );
};