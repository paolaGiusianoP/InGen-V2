import React from 'react';
import { Reveal } from './Reveal';
import { siteData } from '../data/siteData';

const mapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52339.50908875064!2d-56.195884792687025!3d-34.92603617322278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f819e0be26dff%3A0x5721a12a2943bc00!2sPunta%20Carretas%2C%2011300%20Montevideo%2C%20Departamento%20de%20Montevideo!5e0!3m2!1ses!2suy!4v1790811739106!5m2!1ses!2suy';

export const Contact = () => {
  const { address, hours = [], phone, instagram, whatsappNumber } = siteData.info;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola! Quisiera consultar disponibilidad en InGen Kitchen.')}`;
  const label = 'font-mono text-[10px] uppercase tracking-[0.3em] text-ember';

  return (
    <section id="contact" className="paper relative px-6 py-28 text-char sm:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="stamp" className="border-b-2 border-char/80 pb-6">
          <p className="-rotate-1 font-hand text-3xl text-ember">Visitanos</p>
          <h2 className="display mt-1 text-6xl sm:text-7xl">Dónde encontrarnos</h2>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <Reveal className="space-y-10 lg:col-span-5">
            {address && (
              <div>
                <p className={label}>Dirección</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer"
                  className="mt-2 block font-serif text-3xl font-semibold leading-tight transition-colors hover:text-ember">{address}</a>
              </div>
            )}

            {hours.length > 0 && (
              <div>
                <p className={label}>Horarios</p>
                <ul className="mt-3">
                  {hours.map((h, i) => (
                    <li key={h.days || i} className="flex items-baseline gap-3 border-b border-dashed border-char/25 py-2.5">
                      <span className="font-sans text-sm">{h.days}</span>
                      <span className="mb-1 flex-1 border-b-2 border-dotted border-char/40" aria-hidden="true" />
                      <span className="font-mono text-sm font-bold">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <p className={label}>Contacto</p>
              <div className="mt-3 space-y-1.5 font-mono text-sm">
                {phone && <a href={`tel:${phone.replace(/\s/g, '')}`} className="block transition-colors hover:text-ember">{phone}</a>}
                {instagram && <a href={`https://instagram.com/${instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-ember">{instagram}</a>}
              </div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-block border-2 border-char bg-char px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:border-ember hover:bg-ember">
                Escribinos por WhatsApp →
              </a>
            </div>
          </Reveal>

          <Reveal variant="drop" delay={150} className="lg:col-span-7">
            <figure className="relative rotate-[1.5deg] bg-[#fbf6ea] p-3 pb-4 shadow-[0_22px_40px_-14px_rgba(40,20,5,0.6)]">
              <span aria-hidden="true" className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 rotate-2 bg-[#d8bf88]/75 shadow-sm" />
              <div className="relative h-[420px] overflow-hidden">
                <iframe src={mapEmbed} title="Mapa de InGen Kitchen" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full" style={{ border: 0, filter: 'sepia(0.55) saturate(0.85) contrast(0.95)' }} allowFullScreen />
              </div>
              <figcaption className="pt-3 pl-1 font-hand text-2xl leading-none">{address} · ¡te esperamos!</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
