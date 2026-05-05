import type { FormData } from "./types";

export const TONES = [
  "Cercano y empático",
  "Profesional y directo",
  "Inspirador",
  "Técnico y experto",
  "Divertido y casual",
];

export const EMAIL_META = [
  { name: "Bienvenida", timing: "Inmediato", color: "#4ADE80" },
  { name: "Historia", timing: "Día 2", color: "#60A5FA" },
  { name: "Valor puro", timing: "Día 4", color: "#A78BFA" },
  { name: "Caso de éxito", timing: "Día 6", color: "#F472B6" },
  { name: "Objeción", timing: "Día 8", color: "#FB923C" },
  { name: "Urgencia", timing: "Día 10", color: "#FBBF24" },
  { name: "Último aviso", timing: "Día 12", color: "#F87171" },
];

export const PROCESSING_STEPS = [
  {
    id: "trends",
    label: "Analizando tendencias del mercado",
    sub: "espia-tendencias vía web_search",
  },
  {
    id: "emails",
    label: "Generando secuencia de 7 emails",
    sub: "emails-venta",
  },
  { id: "done", label: "Empaquetando entregable", sub: "beautiful-pdf" },
];

export const TEST_CASES: { label: string; data: FormData }[] = [
  {
    label: "🛍 E-commerce — Ropa sostenible",
    data: {
      clientName: "Verde Raíz",
      niche: "Moda sostenible y consumo consciente",
      product:
        "Membresía de ropa de segunda mano curada — cajas mensuales de 5 prendas seleccionadas por estilista",
      price: "$49 USD / mes",
      problem:
        "Mujeres que quieren vestirse bien y de forma sostenible pero no tienen tiempo para buscar en ferias o apps de segunda mano",
      result:
        "Reciben 5 prendas curadas según su estilo en su puerta cada mes, sin perder tiempo y reduciendo su huella de carbono",
      audience:
        "Mujeres 28-42 años, profesionales urbanas, con conciencia ambiental y poder adquisitivo medio-alto",
      tone: "Cercano y empático",
      guarantee: "Primera caja con devolución gratis si no te convence",
    },
  },
  {
    label: "💼 B2B — Software de RRHH",
    data: {
      clientName: "Humano HQ",
      niche: "Software RRHH y gestión de talento para PYMEs",
      product:
        "Plataforma de onboarding y seguimiento de empleados con IA — automatiza primeros 90 días del nuevo empleado",
      price: "$290 USD / mes (hasta 50 empleados)",
      problem:
        "Empresas que pierden talento en los primeros 3 meses porque el onboarding es caótico, manual y sin seguimiento",
      result:
        "Reducción del 40% en rotación temprana y 3 horas semanales ahorradas por HR manager en los primeros 90 días",
      audience:
        "Directores de RRHH y CEOs de PYMEs de 20-100 empleados en crecimiento rápido",
      tone: "Profesional y directo",
      guarantee: "30 días de prueba sin tarjeta de crédito",
    },
  },
  {
    label: "🎓 Educación — Curso de IA para no-técnicos",
    data: {
      clientName: "Inteligencia Práctica",
      niche: "Educación en inteligencia artificial para profesionales no técnicos",
      product:
        "Programa de 6 semanas: Automatizá tu trabajo con IA sin saber programar",
      price: "$397 USD pago único",
      problem:
        "Profesionales de marketing, ventas y administración que ven cómo la IA reemplaza tareas de su área pero no saben por dónde empezar",
      result:
        "Dominan 5 herramientas de IA aplicadas a su trabajo específico y ahorran mínimo 2 horas diarias en tareas repetitivas",
      audience:
        "Profesionales de 30-50 años en roles no técnicos que quieren mantenerse relevantes sin aprender a programar",
      tone: "Inspirador",
      guarantee: "Garantía de satisfacción de 14 días — devolución sin preguntas",
    },
  },
];

export const INITIAL_FORM: FormData = {
  clientName: "",
  niche: "",
  product: "",
  price: "",
  problem: "",
  result: "",
  audience: "",
  tone: TONES[0],
  guarantee: "",
};
