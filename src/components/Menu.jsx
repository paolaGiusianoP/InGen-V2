import React, { useEffect, useRef, useState } from 'react';
import { siteData } from '../data/siteData';
import { Reveal } from './Reveal';
import { Polaroid } from './Polaroid';

export const Menu = () => {
  const { title, subtitle, filters, items } = siteData.menu;
  const [filter, setFilter] = useState('all');
  const [activeId, setActiveId] = useState(null);
  const rows = useRef([]);

  const list = filter === 'all' ? items : items.filter((i) => i.categoryId === filter);
  const shown = list.find((i) => i.id === activeId) || list.find((i) => i.highlight) || list[0];

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.dataset.id)),
      { rootMargin: '-40% 0px -52% 0px' }
    );
    rows.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [filter]);

  rows.current.length = list.length;

  return (
    <section id="menu" className="paper relative px-6 py-28 text-char sm:px-12">
      <Reveal className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-6 border-b-2 border-char/80 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal variant="stamp">
            <p className="-rotate-1 font-hand text-3xl text-ember">{subtitle}</p>
            <h2 className="display mt-1 text-6xl sm:text-7xl">{title}</h2>
          </Reveal>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Categorías de la carta">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => { setFilter(f.id); setActiveId(null); }}
                aria-pressed={filter === f.id}
                className={`border-b-2 pb-1 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  filter === f.id ? 'border-ember text-ember' : 'border-transparent text-char/60 hover:text-char'
                }`}
              >
                {f.label}
              </button>
            ))}
          </nav>
        </header>

        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <ul key={filter} className="lg:col-span-7">
            {list.map((it, i) => {
              const on = it.id === shown?.id;
              return (
                <li
                  key={it.id}
                  ref={(el) => { rows.current[i] = el; }}
                  data-id={it.id}
                  tabIndex={0}
                  onMouseEnter={() => setActiveId(it.id)}
                  onFocus={() => setActiveId(it.id)}
                  className={`card-in border-b border-dashed border-char/25 py-5 outline-none transition-colors lg:border-l-4 lg:pl-4 ${
                    on ? 'lg:border-l-ember' : 'lg:border-l-transparent'
                  }`}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="flex gap-4">
                    <img src={it.image} alt="" loading="lazy" className="h-20 w-20 shrink-0 object-cover sepia-[.2] lg:hidden" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-serif text-2xl font-semibold leading-tight">{it.name}</h3>
                        {it.tag && <span className="-rotate-3 font-hand text-xl leading-none text-ember">{it.tag}</span>}
                        <span className="mb-1 flex-1 border-b-2 border-dotted border-char/40" aria-hidden="true" />
                        <span className="font-mono text-lg font-bold tabular-nums">{it.price}</span>
                      </div>
                      <p className="mt-1.5 max-w-md font-sans text-sm leading-relaxed text-char/70">{it.description}</p>
                      <span className="mt-2 flex gap-1" role="img" aria-label={`Intensidad ${it.intensity || 3} de 5`}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span key={n} className={`h-2 w-2 rounded-full ${n <= (it.intensity || 3) ? 'bg-ember' : 'bg-char/15'}`} />
                        ))}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 grid">
              {list.map((it) => {
                const on = it.id === shown?.id;
                return (
                  <div
                    key={it.id}
                    aria-hidden={!on}
                    className="relative transition-all duration-700 ease-out [grid-area:1/1]"
                    style={{ opacity: on ? 1 : 0, transform: on ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.97)' }}
                  >
                    <Polaroid src={it.image} alt={it.name} caption={it.name} tilt={-2.5} ratio="aspect-[4/3]" />
                    <span className="absolute -right-4 -top-5 rotate-12 rounded-full bg-ember px-4 py-3 font-mono text-lg font-bold text-paper shadow-lg">
                      {it.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </Reveal>
    </section>
  );
};
