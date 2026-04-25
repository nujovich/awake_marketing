export type Tier = {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  tagline: string;
  time?: string;
  features: string[];
  badge?: string;
  featured?: boolean;
  cta?: { label: string; href: string };
};

export const diagnostico: Tier[] = [
  {
    id: "consultoria",
    name: "Consultoría de Descubrimiento",
    price: "Gratis",
    priceNote: "Sesión de 30 min por videollamada",
    tagline:
      "Nos conocemos, entendemos qué necesita tu marca y te presupuestamos. Si tu marca está bien, te lo decimos. Si no podemos ayudarte, también.",
    features: [
      "30 minutos por videollamada",
      "Sin compromiso, sin letra chica",
      "Recomendación honesta sobre próximos pasos",
    ],
    cta: { label: "Reservar consultoría", href: "/contacto" },
  },
  {
    id: "radar",
    name: "Diagnóstico RADAR",
    price: "75 €",
    priceNote: "+ IVA · bonificable con el Pack CORE",
    tagline:
      "El primer paso del Método CORE. Auditoría de situación actual, FODA y hoja de ruta accionable.",
    features: [
      "Auditoría de marca, números y competencia",
      "Análisis FODA y matriz CAME",
      "Hoja de ruta priorizada",
      "Sesión de devolución estratégica",
    ],
    cta: { label: "Pedir diagnóstico", href: "/contacto" },
  },
];

export const branding: Tier[] = [
  {
    id: "rebranding-basico",
    name: "Rebranding Básico",
    price: "150 €",
    tagline:
      "Para los que ya existen. Marcas con base pero que se ven antiguas o desordenadas.",
    time: "2 – 3 semanas",
    features: [
      "Auditoría de marca actual",
      "Rediseño de logotipo (2 propuestas)",
      "Paleta de colores y tipografías",
      "Mini guía de estilo",
    ],
    cta: { label: "Quiero el básico", href: "/contacto" },
  },
  {
    id: "rebranding-redes",
    name: "Rebranding + Redes",
    price: "290 €",
    tagline:
      "El impulso. Para quien quiere cambiar su imagen y empezar a mostrarla con estrategia.",
    time: "1 mes aprox.",
    features: [
      "Todo lo del Rebranding Básico",
      "Estrategia CORE básica",
      "Pack de lanzamiento: 6 posts + 4 stories de “Hola, cambiamos”",
      "Optimización de bio",
    ],
    cta: { label: "Quiero el impulso", href: "/contacto" },
  },
  {
    id: "core-total",
    name: "Pack CORE + Branding Total",
    price: "990 € – 1.200 €",
    priceNote:
      "+ IVA · precio promocional 2026 (en agencia senior costaría 2.500 €)",
    tagline:
      "El despertar completo. Para una marca que nace o se reinventa de raíz.",
    time: "1 a 1,5 meses",
    badge: "Estrella",
    featured: true,
    features: [
      "Estrategia CORE: claridad, objetivo y guía estratégica",
      "Identidad visual: logotipo (3 propuestas + revisiones), paleta, tipografías y mini guía de marca",
      "Kit de lanzamiento: 8 posts de Instagram (estrategia de ventas), 4 stories de captación y animación de logo para Reels",
      "Herramientas Pro: tarjeta digital, plantillas de presupuesto y servicios, firma de email/WhatsApp y 5 plantillas Canva",
      "Dossier comercial en PDF + sesión de asesoría personalizada",
    ],
    cta: { label: "Quiero el despertar", href: "/contacto" },
  },
];

export const rrss: Tier[] = [
  {
    id: "esencial",
    name: "Pack Esencial",
    price: "220 €/mes",
    tagline:
      "Presencia básica sin gastar mucho. Ideal si querés empezar con cabeza.",
    features: [
      "5 posts en feed",
      "4 plantillas editables para stories",
      "Estrategia mensual básica de contenido",
      "Calendario estratégico básico",
      "Evaluación de métricas mensuales",
    ],
    cta: { label: "Empezar con Esencial", href: "/contacto" },
  },
  {
    id: "gold",
    name: "Pack Gold — Despertar",
    price: "330 €/mes",
    tagline:
      "Para que sientas que “por fin alguien te soluciona todo” por un precio que podés pagar.",
    features: [
      "8 publicaciones al mes (6 posts + 2 Reels sencillos)",
      "4 stories + 2 plantillas editables",
      "1 hora de fotos y vídeos básicos",
      "Definición de objetivos y 4 pilares de contenido",
      "Regalo: ajuste de bio y portadas de destacadas (primer mes)",
    ],
    cta: { label: "Empezar con Gold", href: "/contacto" },
  },
  {
    id: "pro",
    name: "Pack PRO",
    price: "450 €/mes",
    tagline: "El equilibrio perfecto entre diseño y crecimiento.",
    badge: "Recomendado",
    featured: true,
    features: [
      "5 posts + 2 Reels + 2 stories diseñadas con interacción + 2 stories editables (Canva)",
      "Estrategia mensual de contenido",
      "Calendario estratégico + evaluación de métricas",
      "Sesión mensual de 1,5 h: 15 fotos + 4 brutos para 3 Reels",
      "Regalo: portadas para destacadas + optimización de bio",
    ],
    cta: { label: "Quiero el PRO", href: "/contacto" },
  },
  {
    id: "elite",
    name: "Pack Elite",
    price: "650 €/mes",
    tagline: "Máximo impacto. Para marcas que quieren dominar su nicho.",
    features: [
      "10 posts + 4 Reels + 4 stories diseñadas",
      "4 stories interactivas (enfoque captación) + 2 stories editables (Canva)",
      "Estrategia + calendario + evaluación de métricas",
      "2 sesiones de fotos y vídeos al mes (1 h cada una o una de 2 h)",
    ],
    cta: { label: "Quiero el Elite", href: "/contacto" },
  },
  {
    id: "libre",
    name: "Pack Libre — A medida",
    price: "Presupuesto",
    priceNote: "Según cantidad de Reels, gestión y momento de la marca",
    tagline:
      "Cuando ningún pack encaja. Empezamos con la consultoría gratuita y armamos algo a tu medida.",
    features: [
      "Sesión de descubrimiento gratuita (30 min)",
      "Propuesta personalizada según ciclo de vida de la marca",
      "Combina branding, contenido y/o producción audiovisual",
      "Si no es necesario o no podemos ayudarte, te lo decimos",
    ],
    cta: { label: "Pedir presupuesto", href: "/contacto" },
  },
];
