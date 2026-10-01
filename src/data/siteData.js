export const siteData = {
  // INFO GENERAL
  info: {
    name: "InGen Kitchen",
    tagline: "Sabores para Compartir",
    subtitle: "Una mesa pensada para disfrutar, compartir y comer bien, entre amigos y familia.",
    address: "Av. Roosevelt 1420, Montevideo",
    phone: "+598 99 123 456",
    whatsappNumber: "59899123456",
    instagram: "@ingen.kitchen",
    hours: [
      { days: "Martes a Jueves", time: "19:30 - 00:00" },
      { days: "Viernes y Sábados", time: "19:30 - 01:30" },
      { days: "Domingos", time: "12:30 - 16:00 (Almuerzo)" },
    ],
  },

  // MENÚ 
  menu: {
    title: "Nuestra carta",
    subtitle: "Fuego, maduración y técnica en cada plato.",
    filters: [
      { id: "all", label: "Todos" },
      { id: "starters", label: "Entradas" },
      { id: "mains", label: "Carnes & Fuegos" },
      { id: "signature", label: "Cocina de Autor" },
      { id: "desserts", label: "Postres" },
      { id: "cocktails", label: "Coctelería" },
    ],
    items: [
      // ENTRADAS
      {
        id: "b1",
        categoryId: "starters",
        name: "Tártaro Amber Ember",
        description:
          "Lomo madurado 45 días, yema curada en ceniza de olivo y tostadas de masa madre.",
        price: "$ 580",
        tag: "Chef Special",
        intensity: 3,
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
        highlight: true,
      },
      {
        id: "b2",
        categoryId: "starters",
        name: "Marrow & Flame",
        description:
          "Caracú a la parrilla de quebracho, chimichurri ahumado de hierbas silvestres y sal negra.",
        price: "$ 490",
        tag: "Recomendado",
        intensity: 4,
        image:
          "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&q=80&w=800",
        highlight: false,
      },

      // CARNES & FUEGOS
      {
        id: "m1",
        categoryId: "mains",
        name: "Tomahawk Prime Fossil",
        description:
          "1.2 kg de corte con hueso a la leña de manzano, mantequilla ahumada y sal marina.",
        price: "$ 2.100",
        tag: "Para compartir",
        intensity: 5,
        image:
          "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&q=80&w=800",
        highlight: true,
      },
      {
        id: "m2",
        categoryId: "mains",
        name: "Ojo de Bife Apex",
        description:
          "400g de corte madurado en húmedo con costra de pimientas salvajes y puré de camote al rescoldo.",
        price: "$ 980",
        tag: "Sin Gluten",
        intensity: 4,
        image:
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800",
        highlight: false,
      },

      {
        id: "s1",
        categoryId: "signature",
        name: "Risotto Cobre & Hongos",
        description:
          "Arroz carnaroli en reducción de trufas negras, hongos pino de pino y crocante de parmesano.",
        price: "$ 790",
        tag: "Vegetariano",
        intensity: 2,
        image:
          "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800",
        highlight: false,
      },
      {
        id: "s2",
        categoryId: "signature",
        name: "Salmón Silvestre Ahumado",
        description:
          "Cocción lenta a baja temperatura con emulsión de cítricos y vegetales de estación fermentados.",
        price: "$ 890",
        tag: "Sin Gluten",
        intensity: 3,
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
        highlight: false,
      },

      // POSTRES
      {
        id: "d1",
        categoryId: "desserts",
        name: "Volcán Ámbar",
        description:
          "Sofort de chocolate 70% con corazón fluido de caramelo salado y helado de vainilla ahumada.",
        price: "$ 380",
        tag: "Clásico",
        intensity: 5,
        image:
          "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
        highlight: true,
      },
      {
        id: "d2",
        categoryId: "desserts",
        name: "Mousse Cacao & Cítricos",
        description:
          "Texturas de chocolate amargo, crocante de avellanas y gel de maracuyá.",
        price: "$ 350",
        tag: "Recomendado",
        intensity: 3,
        image:
          "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&q=80&w=800",
        highlight: false,
      },

      {
        id: "c1",
        categoryId: "cocktails",
        name: "InGen Reserve Sour",
        description:
          "Bourbon infusionado en tocino ahumado, almíbar de miel silvestre, limón y humo de romero.",
        price: "$ 420",
        tag: "Trago de Autor",
        intensity: 4,
        image:
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
        highlight: true,
      },
      {
        id: "c2",
        categoryId: "cocktails",
        name: "Amber Extraction",
        description:
          "Gin botánico, licor de saúco, tónica artesanal y esfera helada con brote comestible.",
        price: "$ 390",
        tag: "Refrescante",
        intensity: 2,
        image:
          "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800",
        highlight: false,
      },
    ],
  },

  // SECTORES
  sectors: [
    { id: "salon", name: "Salón Principal" },
    { id: "terraza", name: "Terraza Verde (Outdoor)" },
    { id: "barra", name: "Barra & Mixología" },
  ],
};