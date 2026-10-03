# InGen Kitchen

Una experiencia digital pensada como una carta impresa que cobra vida: tipografía editorial, texturas de papel, polaroids con cinta adhesiva y una chispa que recorre el sitio iluminando cada sección.

---

## Características

- **Diseño editorial rústico** — Estética de carta impresa con tipografías Fraunces, Caveat y Courier Prime
- **Transiciones entre secciones** — Bordes irregulares tipo "papel rasgado" con brasas que saltan
- **Carta interactiva** — Sistema de platos con preview en polaroid, filtros por categoría y punto de intensidad
- **Formulario de reserva** — Estilo "comanda de cocina" que envía la solicitud por WhatsApp
- **100% responsive** — Optimizado para desktop, tablet y mobile
- **Accesibilidad** — Soporte para `prefers-reduced-motion`, focus visible, ARIA labels

---

## Stack Técnico

| Categoría | Tecnología |
|-----------|-----------|
| **Framework** | React 19 |
| **Build Tool** | Vite |
| **Estilos** | Tailwind CSS 4 |
| **Tipografías** | Fraunces · Caveat · Courier Prime · Inter |
| **Iconos** | Lucide React |
| **Utilidades** | Web Animations API · Intersection Observer · ResizeObserver |
| **Deploy** | Vercel |

---

## Estructura del Proyecto

src/
├── components/
│ ├── HeroRustic.jsx # Portada principal con collage de polaroids
│ ├── Concept.jsx # Filosofía + 4 pilares
│ ├── Menu.jsx # Carta con preview interactivo
│ ├── Gallery.jsx # Galería tipo scrapbook con lightbox
│ ├── Reservation.jsx # Formulario estilo comanda
│ ├── Contact.jsx # Info + mapa con marco de papel
│ ├── Footer.jsx # Cierre con CTA
│ ├── Navbar.jsx # Navegación responsive
│ ├── Preloader.jsx # Pantalla de carga temática
│ ├── PageTransition.jsx # Transición entre anclas
│ ├── Edge.jsx # Borde irregular entre secciones
│ ├── Polaroid.jsx # Componente de foto estilo polaroid
│ ├── Reveal.jsx # Wrapper para animaciones al scroll
│ ├── ScrollProgress.jsx # Barra de progreso de scroll
│ ├── Traveler.jsx # Chispa personaje animada
│ └── WhatsAppFloat.jsx # Botón flotante de reserva
├── hooks/
│ ├── useActiveSection.js # Detecta sección activa
│ ├── useScrollVar.js # Variables CSS sincronizadas al scroll
│ └── useMeniscus.js # Efecto de curvatura entre secciones
├── data/
│ └── siteData.js # Contenido centralizado (info, menú, sectores)
├── App.jsx # Composición de secciones
├── main.jsx # Entry point
└── index.css # Estilos globales + tema Tailwind

text

---

## Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/ingen-kitchen.git
cd ingen-kitchen

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
El sitio estará disponible en http://localhost:5173.

