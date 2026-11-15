export type Lang = 'es' | 'en';

// Enlaces de navegación compartidos por Header y Footer (el texto sale del diccionario)
export const NAV_LINKS = [
  { key: 'inicio', href: '#inicio' },
  { key: 'nosotros', href: '#nosotros' },
  { key: 'soluciones', href: '#soluciones' },
  { key: 'templates', href: '#templates' },
  { key: 'contacto', href: '#contacto' },
] as const;

const es = {
  meta: {
    title: 'WINNO Solutions | Tecnología que transforma negocios',
    description:
      'Desarrollamos soluciones digitales e innovadoras para resolver problemas, optimizar operaciones y crear nuevas oportunidades.',
  },
  nav: {
    items: {
      inicio: 'Inicio',
      nosotros: 'Nosotros',
      soluciones: 'Soluciones',
      templates: 'Winno Templates',
      contacto: 'Contacto',
    },
    cta: 'Hablemos',
    home: 'WINNO Solutions, ir al inicio',
    main: 'Principal',
    mobile: 'Móvil',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    language: 'Idioma',
  },
  hero: {
    eyebrow: 'TECNOLOGÍA E INNOVACIÓN',
    title: 'Tecnología que transforma negocios.',   
    text: 'Desarrollamos soluciones digitales e innovadoras para resolver problemas, optimizar operaciones y potenciar negocios.',
    primary: 'Conócenos',
    secondary: 'Explora nuestras soluciones',
    scroll: 'Desplázate',
  },
        
  about: {
    eyebrow: 'SOBRE WINNO',
    title1: 'Innovación con propósito.',
    title2: 'Tecnología con impacto.',
    text: 'Somos una empresa tecnológica que impulsa el futuro a través de la innovación. Creamos soluciones y desarrollamos tecnología para transformar ideas en oportunidades, potenciar negocios y generar un impacto que trascienda fronteras.',
    conceptsLabel: 'Nuestros conceptos',
    concepts: ['Innovación', 'Tecnología', 'Transformación'],
  },
  expertise: {
    eyebrow: 'LO QUE HACEMOS',
    title: 'Creamos soluciones para transformar el futuro.',
    servicesLabel: 'Nuestros servicios',
    services: [
      {
        title: 'Desarrollo de software',
        description: 'Sistemas y aplicaciones diseñados para cada necesidad.',
      },
      {
        title: 'Experiencias digitales',
        description: 'Sitios web y experiencias de comercio electrónico.',
      },
      {
        title: 'Automatización e integración',
        description: 'Procesos inteligentes y plataformas conectadas.',
      },
      {
        title: 'Tecnología e innovación',
        description: 'Tecnología aplicada a problemas reales.',
      },
    ],
  },
  product: {
    eyebrow: 'NUESTRO PRODUCTO',
    name: 'Winno Templates',
    title: 'Tu negocio, listo para crecer online.',
    text: 'Tiendas online personalizadas para marcas que quieren vender y gestionar mejor.',
    tabsLabel: 'Características de Winno Templates',
    cta: 'Solicitar demo',
    features: [
      {
        label: 'Diseño personalizado',
        alt: 'Tienda online con diseño personalizado: logo, paleta de colores y catálogo',
      },
      {
        label: 'Gestión de productos y pedidos',
        alt: 'Panel de gestión de productos y pedidos con sus estados',
      },
      {
        label: 'Control de inventario',
        alt: 'Control de inventario con niveles de stock por producto',
      },
      {
        label: 'Integración con WhatsApp',
        alt: 'Tienda conectada a WhatsApp para atender a los clientes',
      },
    ],
  },
  process: {
    eyebrow: 'CÓMO TRABAJAMOS',
    title: 'De los desafíos a las soluciones.',
    scroll: 'Sigue desplazándote',
    steps: [
      { title: 'Descubrimos', description: 'Entendemos el desafío.' },
      { title: 'Diseñamos', description: 'Definimos la solución.' },
      { title: 'Desarrollamos', description: 'Convertimos ideas en tecnología.' },
      { title: 'Evolucionamos', description: 'Mejoramos continuamente.' },
    ],
  },
  contact: {
    title: 'El siguiente paso empieza con una idea.',
    text: 'Hagamos que la tecnología trabaje a favor de tu negocio.',
    cta: 'Hablemos',
    whatsapp: 'Escríbenos por WhatsApp',
    mailSubject: 'Quiero conversar sobre un proyecto',
  },
  notFound: {
    eyebrow: 'ERROR 404',
    title: 'Esta página no existe.',
    text: 'La dirección que buscas se movió o nunca existió. Volvamos al camino.',
    cta: 'Volver al inicio',
  },
  loader: {
    label: 'CARGANDO',
  },
  footer: {
    slogan: 'Convertimos desafíos en soluciones inteligentes.',
    nav: 'Pie de página',
    rights: 'Todos los derechos reservados.',
    top: 'Volver arriba',
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    title: 'WINNO Solutions | Technology that transforms business',
    description:
      'We build digital and innovative solutions to solve problems, streamline operations and create new opportunities.',
  },
  nav: {
    items: {
      inicio: 'Home',
      nosotros: 'About',
      soluciones: 'Solutions',
      templates: 'Winno Templates',
      contacto: 'Contact',
    },
    cta: "Let's talk",
    home: 'WINNO Solutions, back to top',
    main: 'Main',
    mobile: 'Mobile',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },
  hero: {
    eyebrow: 'TECHNOLOGY & INNOVATION',
    title: 'Technology that transforms business.',
    text: 'We build digital and innovative solutions to solve problems, streamline operations and and boost businesses.',
    primary: 'Get to know us',
    secondary: 'Explore our solutions',
    scroll: 'Scroll',
  },
  about: {
    eyebrow: 'ABOUT WINNO',
    title1: 'Innovation with purpose.',
    title2: 'Technology with impact.',
    text: 'We are a technology company shaping the future through innovation. We create solutions and develop technology to turn ideas into opportunities, empower businesses, and make an impact beyond borders.',
    conceptsLabel: 'Our concepts',
    concepts: ['Innovation', 'Technology', 'Transformation'],
  },
  expertise: {
    eyebrow: 'OUR EXPERTISE',
    title: 'We build solutions to shape the future.',
    servicesLabel: 'Our services',
    services: [
      {
        title: 'Software Development',
        description: 'Systems and applications designed for every need.',
      },
      {
        title: 'Digital Experiences',
        description: 'Websites and e-commerce experiences.',
      },
      {
        title: 'Automation & Integration',
        description: 'Smart processes and connected platforms.',
      },
      {
        title: 'Technology & Innovation',
        description: 'Technology applied to real problems.',
      },
    ],
  },
  product: {
    eyebrow: 'OUR PRODUCT',
    name: 'Winno Templates',
    title: 'Your business, ready to grow online.',
    text: 'Custom online stores for brands that want to sell and manage better.',
    tabsLabel: 'Winno Templates features',
    cta: 'Request demo',
    features: [
      {
        label: 'Custom design',
        alt: 'Online store with custom design: logo, color palette and catalog',
      },
      {
        label: 'Product and order management',
        alt: 'Product and order management dashboard with order statuses',
      },
      {
        label: 'Inventory control',
        alt: 'Inventory control with stock levels per product',
      },
      {
        label: 'WhatsApp integration',
        alt: 'Online store connected to WhatsApp to assist customers',
      },
    ],
  },
  process: {
    eyebrow: 'HOW WE WORK',
    title: 'From challenges to solutions.',
    scroll: 'Keep scrolling',
    steps: [
      { title: 'Discover', description: 'We understand the challenge.' },
      { title: 'Design', description: 'We define the solution.' },
      { title: 'Develop', description: 'We turn ideas into technology.' },
      { title: 'Evolve', description: 'We keep improving.' },
    ],
  },
  contact: {
    title: 'The next step starts with an idea.',
    text: "Let's make technology work for your business.",
    cta: "Let's talk",
    whatsapp: 'Message us on WhatsApp',
    mailSubject: "I'd like to talk about a project",
  },
  loader: {
    label: 'LOADING',
  },
  notFound: {
    eyebrow: 'ERROR 404',
    title: "This page doesn't exist.",
    text: "The address you're looking for has moved or never existed. Let's get you back on track.",
    cta: 'Back to home',
  },  
  footer: {
    slogan: 'We turn challenges into smart solutions.',
    nav: 'Footer',
    rights: 'All rights reserved.',
    top: 'Back to top',
  },
};

export const translations: Record<Lang, Dictionary> = { es, en };