import React from 'react';
import { Reveal } from './Reveal';
import { Flame, Beef, Wine, Leaf } from 'lucide-react';

export const Concept = () => {
  const highlights = [
    {
      icon: Flame,
      title: "Fuego & Maderas Nobles",
      description: "Cocciones lentas sobre quebracho y leña de manzano para resaltar el carácter de cada corte."
    },
    {
      icon: Beef,
      title: "Maduración Controlada",
      description: "Cámara propia de maduración en seco con control estricto de humedad y temperatura."
    },
    {
      icon: Wine,
      title: "Coctelería Botánica",
      description: "Tragos de autor infusionados con técnicas de extracción y humo aromático."
    },
    {
      icon: Leaf,
      title: "Ingredientes Seleccionados",
      description: "Trazabilidad completa en carnes Prime y vegetales de huertas orgánicas locales."
    }
  ];

  return (
    <section id="concepto" className="relative py-24 text-slate-200">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[120px]" />

      <Reveal className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-amber-500/60" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
                Nuestra filosofía
              </span>
            </div>

            <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
              Donde la precisión científica abraza la fuerza del fuego.
            </h2>

            <p className="font-sans text-base leading-relaxed text-slate-400">
              En <strong className="text-amber-500">InGen Kitchen</strong> entendemos la cocina como una ciencia en constante evolución. Seleccionamos razas de pastoreo y aplicamos técnicas de maduración en húmedo y seco para transformar cada plato en una experiencia sensorial irrepetible.
            </p>

            <p className="font-sans text-base leading-relaxed text-slate-400">
              Inspirados en la alquimia del fuego primal y los sabores auténticos, combinamos la técnica gastronómica moderna con la calidez de un espacio de alta sofisticación.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-amber-900/20 shadow-2xl">
            {/* Foto de fondo */}
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200"
              alt="Parrilla InGen"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b130d] via-[#1b130d]/70 to-[#1b130d]/40" />

            {/* Contenido */}
            <div className="relative z-10 p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div className="space-y-2 border-r border-amber-900/30 pr-4">
                  <span className="font-serif text-4xl font-bold text-amber-500 sm:text-5xl">45</span>
                  <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    Días de maduración en seco
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="font-serif text-4xl font-bold text-amber-500 sm:text-5xl">100%</span>
                  <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    Cocción a leña de quebracho
                  </p>
                </div>
                <div className="space-y-2 border-r border-amber-900/30 pr-4 pt-6">
                  <span className="font-serif text-4xl font-bold text-amber-500 sm:text-5xl">12</span>
                  <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    Tragos de autor en carta
                  </p>
                </div>
                <div className="space-y-2 pt-6">
                  <span className="font-serif text-4xl font-bold text-amber-500 sm:text-5xl">3</span>
                  <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    Ambientes para elegir
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 pilares */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const IconComponent = item.icon;
            const isFeatured = index === 0;
            return (
              <div
                key={index}
                className={`
                  group rounded-xl p-6 transition-all duration-300 hover:-translate-y-1
                  ${isFeatured
                    ? 'border border-amber-500/30 bg-gradient-to-br from-[#261a11] to-[#33231a] shadow-lg shadow-amber-500/5'
                    : 'border border-amber-900/20 bg-[#261a11]/60 hover:border-amber-500/40 hover:bg-[#261a11]'
                  }
                `}
              >
                <div
                  className={`
                    mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-colors
                    ${isFeatured
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950'
                    }
                  `}
                >
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-semibold text-slate-100">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
};