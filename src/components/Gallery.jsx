import React, { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import { Polaroid } from './Polaroid';
import { siteData } from '../data/siteData';

const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5, -3.5, 2.5];
const RATIOS = ['aspect-[4/5]', 'aspect-square', 'aspect-[4/3]', 'aspect-[4/5]', 'aspect-[4/3]', 'aspect-[4/5]', 'aspect-square', 'aspect-[4/3]'];

export const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const galleryItems = siteData.gallery || [
    {
      id: '1',
      title: 'Cámara de Maduración',
      category: 'Procesos',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '2',
      title: 'Mesa del Chef',
      category: 'Experiencia',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '3',
      title: 'Fuego & Brasas',
      category: 'Cocina',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '4',
      title: 'Ingredientes de Origen',
      category: 'Insumos',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '5',
      title: 'Coctelería de Autor',
      category: 'Bar',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '6',
      title: 'Plato Terminado',
      category: 'Cocina',
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '7',
      title: 'Cava de Vinos',
      category: 'Experiencia',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '8',
      title: 'Detalles del Salón',
      category: 'Ambiente',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200',
    },
  ];

  const selectedImage = selectedIndex !== null ? galleryItems[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') setSelectedIndex((i) => (i + 1) % galleryItems.length);
      if (e.key === 'ArrowLeft') setSelectedIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedIndex, galleryItems.length]);

  return (
    <section id="gallery" className="wood relative px-6 py-28 text-slate-100 sm:px-12">
      <div className="pointer-events-none absolute left-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        <Reveal variant="stamp" className="flex flex-col justify-between gap-6 border-b-2 border-slate-100/70 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="-rotate-1 font-hand text-3xl text-amber-400">Registro visual</p>
            <h2 className="display mt-1 text-6xl text-slate-100 sm:text-7xl">Dentro de InGen.</h2>
          </div>
          <a
            href={`https://instagram.com/${siteData.info.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-300 transition-colors hover:text-amber-400"
          >
            {siteData.info.instagram} →
          </a>
        </Reveal>

        <div className="mt-16 columns-1 gap-10 sm:columns-2 lg:columns-3">
          {galleryItems.map((item, index) => (
            <Reveal key={item.id} variant="drop" delay={(index % 3) * 120} className="mb-12 break-inside-avoid">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedIndex(index)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedIndex(index)}
                aria-label={`Abrir imagen: ${item.title}`}
                className="cursor-pointer outline-none transition duration-500 hover:-translate-y-2 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <Polaroid src={item.image} alt={item.title} caption={item.title} tilt={TILTS[index % 8]} ratio={RATIOS[index % 8]} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md"
          onClick={() => setSelectedIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-amber-900/40 bg-amber-500/10 text-slate-100 transition-all hover:bg-amber-500 hover:text-slate-950"
            aria-label="Cerrar"
          >
            ✕
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex - 1 + galleryItems.length) % galleryItems.length);
            }}
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-amber-900/40 bg-amber-500/10 text-2xl text-slate-100 transition-all hover:bg-amber-500 hover:text-slate-950 md:left-10"
            aria-label="Anterior"
          >
            ‹
          </button>

          <div className="relative max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber-500">
                  {selectedImage.category}
                </p>
                <p className="mt-1 font-serif text-lg text-slate-100">
                  {selectedImage.title}
                </p>
              </div>
              <p className="font-mono text-xs text-slate-500">
                {selectedIndex + 1} / {galleryItems.length}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex + 1) % galleryItems.length);
            }}
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-amber-900/40 bg-amber-500/10 text-2xl text-slate-100 transition-all hover:bg-amber-500 hover:text-slate-950 md:right-10"
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};