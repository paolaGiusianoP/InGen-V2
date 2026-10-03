import React, { useEffect, useState } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { siteData } from '../data/siteData';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'El Concepto', href: '#concepto' },
    { label: 'La Carta', href: '#menu' },
    { label: 'Galería', href: '#gallery' },
    { label: 'Reserva', href: '#reservation' },
    { label: 'Contacto', href: '#contact' },
  ];

  const whatsappUrl = `https://wa.me/${siteData.info.whatsappNumber}?text=${encodeURIComponent(
    'Hola! Me gustaría hacer una consulta para reservar una mesa en InGen Kitchen.'
  )}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);
  const active = useActiveSection(navItems.map((i) => i.href.slice(1)));

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50
          transition-all duration-500 ease-out
          ${
            scrolled
              ? 'border-b border-amber-900/20 bg-[#1b130d]/90 py-3 backdrop-blur-md shadow-lg shadow-black/40'
              : 'border-b border-amber-900/30 bg-[#1b130d]/95 py-4 backdrop-blur-md'
          }
        `}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 lg:px-12">
          {/* Logo & Marca */}
          <a
            href="#"
            onClick={close}
            className="font-serif text-lg tracking-tight text-slate-100 transition-opacity hover:opacity-80"
          >
            InGen <span className="italic text-slate-400">Kitchen</span>
          </a>

          {/* Links desktop */}
          <nav
            aria-label="Navegación principal"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-300 md:flex"
          >
            {navItems.map((item, i) => (
              <React.Fragment key={item.href}>
                {i > 0 && <span className="text-amber-500/20">|</span>}
                <a
                  href={item.href}
                  className="nav-link transition-colors hover:text-amber-500"
                  aria-current={active === item.href.slice(1)}
                >
                  {item.label}
                </a>
              </React.Fragment>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center text-slate-100 transition-colors hover:text-amber-500 md:hidden"
          >
            <span className="relative block h-3 w-6">
              <span className={`absolute left-0 h-0.5 w-full bg-current transition-transform duration-300 ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 h-0.5 w-full bg-current transition-transform duration-300 ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
            </span>
          </button>

        </div>
      </header>

      {/* Overlay mobile */}
      <div
        aria-hidden={!open}
        className={`
          fixed inset-0 z-40 bg-[#1b130d] transition-opacity duration-500 md:hidden
          ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}
        `}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 px-8">
          <nav
            aria-label="Navegación principal mobile"
            className="flex flex-col items-center gap-6"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="font-serif text-2xl tracking-tight text-slate-200 transition-colors hover:text-amber-500"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="mt-6 rounded-full border border-amber-500/40 bg-amber-500/10 px-8 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500 transition-all hover:bg-amber-500 hover:text-slate-950"
          >
            Reservar mesa
          </a>
        </div>
      </div>
    </>
  );
};