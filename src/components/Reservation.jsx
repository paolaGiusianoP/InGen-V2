import React, { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import { siteData } from '../data/siteData';

const line = 'mt-1 w-full border-0 border-b-2 border-char/30 bg-transparent px-0 py-2 font-mono text-base text-char placeholder-char/30 outline-none transition-colors focus:border-ember';
const Field = ({ label, children, className = '' }) => (
  <label className={`block ${className}`}>
    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-char/60">{label}</span>
    {children}
  </label>
);

export const Reservation = () => {
  const [f, setF] = useState({ name: '', phone: '', guests: '2', date: '', time: '20:30', sector: siteData.sectors?.[0]?.name || '', notes: '' });
  const [sent, setSent] = useState(false);
  const [num] = useState(() => 1000 + Math.floor(Math.random() * 8999));

  useEffect(() => {
    if (!sent) return;
    const t = setTimeout(() => setSent(false), 10000);
    return () => clearTimeout(t);
  }, [sent]);

  const on = (e) => setF((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const msg = [
      '*NUEVA SOLICITUD DE RESERVA - INGEN KITCHEN*', '',
      `• *Nombre:* ${f.name}`, `• *Teléfono:* ${f.phone}`, `• *Comensales:* ${f.guests} personas`,
      `• *Fecha:* ${f.date}`, `• *Hora:* ${f.time} hs`,
      f.sector ? `• *Ambiente:* ${f.sector}` : null, f.notes ? `• *Notas:* ${f.notes}` : null,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/${siteData.info.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="reservation" className="wood relative bg-ink-950 px-6 py-28 text-slate-100 sm:px-12">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:items-center">
        <Reveal variant="stamp" className="space-y-6 lg:col-span-5">
          <p className="-rotate-1 font-hand text-3xl text-amber-400">Disponibilidad exclusiva</p>
          <h2 className="display text-5xl sm:text-7xl">Reservá tu lugar junto al fuego.</h2>
          <p className="max-w-md font-sans leading-relaxed text-slate-300">
            Turnos reducidos para cuidar cada servicio. Completá la reserva y te confirmamos por WhatsApp.
          </p>
          <ul className="space-y-2 border-t border-dashed border-slate-100/25 pt-5 font-mono text-xs uppercase tracking-[0.15em] text-slate-300">
            <li>Mediodía · 12:30 a 15:30</li>
            <li>Noche · 20:00 a 00:00</li>
            <li className="text-amber-400">{siteData.info.address}</li>
          </ul>
        </Reveal>

        <Reveal variant="drop" delay={150} className="lg:col-span-7">
          <div className="paper relative -rotate-1 p-8 text-char shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] sm:p-10">
            <span aria-hidden="true" className="absolute -top-3 left-10 h-7 w-28 -rotate-2 bg-[#d8bf88]/75 shadow-sm" />
            <div className="flex items-baseline justify-between border-b-2 border-dashed border-char/40 pb-4">
              <h3 className="font-serif text-2xl font-bold">Comanda de reserva</h3>
              <span className="font-mono text-xs text-char/60">Nº {num}</span>
            </div>

            {sent ? (
              <div className="space-y-5 py-14 text-center">
                <div className="inline-block -rotate-6 border-4 border-ember px-6 py-2 font-serif text-4xl font-black uppercase tracking-wider text-ember">¡Reservado!</div>
                <p className="mx-auto max-w-xs font-sans text-sm text-char/70">Te abrimos WhatsApp para confirmar con el equipo de recepción.</p>
                <button type="button" onClick={() => setSent(false)} className="block w-full font-mono text-xs uppercase tracking-widest text-ember hover:underline">Hacer otra reserva</button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Nombre *"><input className={line} name="name" required value={f.name} onChange={on} placeholder="Ej. Pedro Pérez" /></Field>
                  <Field label="Teléfono / WhatsApp *"><input className={line} type="tel" name="phone" required value={f.phone} onChange={on} placeholder="+598 99 000 000" /></Field>
                </div>
                <div className="grid gap-6 sm:grid-cols-3">
                  <Field label="Comensales">
                    <select className={line} name="guests" value={f.guests} onChange={on}>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>)}
                    </select>
                  </Field>
                  <Field label="Fecha *"><input className={line} type="date" name="date" required min={today} value={f.date} onChange={on} /></Field>
                  <Field label="Horario">
                    <select className={line} name="time" value={f.time} onChange={on}>
                      {['12:30', '13:30', '20:30', '21:30', '22:30'].map((t) => <option key={t} value={t}>{t} hs</option>)}
                    </select>
                  </Field>
                </div>
                {siteData.sectors?.length > 0 && (
                  <Field label="Ambiente preferido">
                    <select className={line} name="sector" value={f.sector} onChange={on}>
                      {siteData.sectors.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                  </Field>
                )}
                <Field label="Alergias o pedidos especiales">
                  <textarea className={`${line} resize-none`} name="notes" rows="2" value={f.notes} onChange={on} placeholder="Restricciones alimentarias, ocasión especial…" />
                </Field>
                <button type="submit" className="w-full border-2 border-char bg-char py-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-paper transition-colors hover:border-ember hover:bg-ember">
                  Enviar reserva por WhatsApp →
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
