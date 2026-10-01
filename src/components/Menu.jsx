import React, { useRef, useState, useEffect } from 'react';
import { siteData } from '../data/siteData';

const INITIAL_COUNT = 6;
const STEP = 6;

export const Menu = () => {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

useEffect(() => {
  const handler = (e) => {
    setActiveFilter(e.detail);
  };
  window.addEventListener('openMenuCategory', handler);
  return () => window.removeEventListener('openMenuCategory', handler);
}, []);

  const filteredItems =
    activeFilter === 'all'
      ? siteData.menu.items
      : siteData.menu.items.filter((item) => item.categoryId === activeFilter);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;
  const hasExpanded = visibleCount > INITIAL_COUNT;

  const showMore = () => setVisibleCount((prev) => prev + STEP);
  const showLess = () => {
    setVisibleCount(INITIAL_COUNT);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative z-20 bg-[#0a0f0d] px-6 py-24 text-slate-100 sm:px-12"
    >
      <div className="absolute top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl space-y-12">
        {/* Encabezado y Filtros */}
        <div className="flex flex-col justify-between gap-8 border-b border-amber-900/20 pb-8 lg:flex-row lg:items-end">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
              Muestras Culinarias
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
              {siteData.menu.title}
            </h2>
            {siteData.menu.subtitle && (
              <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-slate-400">
                {siteData.menu.subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {siteData.menu.filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                aria-pressed={activeFilter === f.id}
                className={`rounded-full px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeFilter === f.id
                    ? 'bg-amber-500 font-semibold text-slate-950 shadow-md shadow-amber-500/10'
                    : 'border border-amber-900/30 text-slate-400 hover:border-amber-500/50 hover:text-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grilla de Platos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, i) => {
            const level = item.intensity || 3;
            const categoryLabel =
              siteData.menu.filters.find((f) => f.id === item.categoryId)?.label ||
              item.categoryId;

            return (
              <article
                key={`${activeFilter}-${item.id}`}
                style={{ animationDelay: `${(i % 3) * 90}ms` }}
                className="card-in group flex flex-col overflow-hidden rounded-2xl border border-amber-900/20 bg-slate-900/40 backdrop-blur-xs transition-all duration-500 hover:border-amber-500/40 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-amber-500/5"
              >
                {/* Imagen del plato */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-transparent to-transparent opacity-80" />

                  {item.tag && (
                    <span className="absolute left-3 top-3 rounded-full border border-amber-500/30 bg-[#0a0f0d]/80 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-amber-400 backdrop-blur-md">
                      {item.tag}
                    </span>
                  )}

                  <span className="absolute bottom-3 left-3 font-mono text-2xl font-bold tabular-nums text-amber-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {item.price}
                  </span>
                </div>

                {/* Detalle y Descripción */}
                <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-serif text-xl font-medium leading-tight text-slate-100">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-amber-500/80">
                      {categoryLabel}
                    </p>
                    <p className="mt-3 font-sans text-xs leading-relaxed text-slate-400">
                      {item.description || item.profile}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-amber-900/20 pt-4 text-xs text-slate-400">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400">
                      Intensidad
                    </span>
                    <span
                      className="flex gap-1"
                      role="img"
                      aria-label={`Intensidad ${level} de 5`}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className={`h-1 w-4 rounded-full transition-colors ${
                            n <= level ? 'bg-amber-500' : 'bg-slate-800'
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="rounded-2xl border border-dashed border-amber-900/30 p-12 text-center">
            <p className="font-sans text-sm text-slate-400">
              No se encontraron elementos disponibles en esta categoría.
            </p>
          </div>
        )}

        {/* Botones de Paginación */}
        {(hasMore || hasExpanded) && (
          <div className="flex justify-center pt-6">
            {hasMore ? (
              <button
                type="button"
                onClick={showMore}
                className="group flex items-center gap-3 rounded-full border border-amber-500/30 bg-amber-500/10 px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400 backdrop-blur-md transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-slate-950"
              >
                Ver más
                <span className="tabular-nums opacity-60">
                  ({filteredItems.length - visibleCount})
                </span>
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={showLess}
                className="group flex items-center gap-3 rounded-full border border-amber-900/40 px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400 transition-all duration-300 hover:border-amber-500/50 hover:text-amber-400"
              >
                Ver menos
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                  ↑
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};