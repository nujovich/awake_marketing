import WorkflowCard from "@/components/ui/WorkflowCard";

const WORKFLOWS = [
  {
    id: "A",
    title: "Cliente nuevo",
    description:
      "Diagnóstico ikigai + análisis de tendencias de mercado + entregable PDF para onboarding de nuevos clientes.",
    skills: ["ikigai", "tendencias", "beautiful-pdf"],
    href: "/workflow-a",
    available: false,
  },
  {
    id: "B",
    title: "Campaña email",
    description:
      "Investigación de tendencias + secuencia de 7 emails de venta con A/B testing de asuntos + entregable PDF.",
    skills: ["espia-tendencias", "emails-venta", "beautiful-pdf"],
    href: "/workflow-b",
    available: true,
  },
  {
    id: "C",
    title: "Reporte mensual",
    description:
      "Análisis SEO + dashboard de métricas del mes + reporte PDF ejecutivo para el cliente.",
    skills: ["seo-audit", "dashboard", "beautiful-pdf"],
    href: "/workflow-c",
    available: false,
  },
  {
    id: "D",
    title: "Auditoría SEO",
    description:
      "Auditoría SEO completa con recomendaciones priorizadas por impacto + entregable PDF.",
    skills: ["seo-audit", "beautiful-pdf"],
    href: "/workflow-d",
    available: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070707] font-mono text-[#F0EDE8]">
      {/* Header */}
      <div className="border-b border-[#1A1A1A] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-ember" />
          <span className="text-[10px] tracking-[3px] uppercase text-[#666]">
            Awake Marketing Agent
          </span>
        </div>
        <span className="text-[10px] text-[#333] tracking-widest">v0.1</span>
      </div>

      {/* Content */}
      <div className="max-w-[680px] mx-auto px-8 py-16">
        <div className="mb-12">
          <h1 className="text-[32px] font-bold leading-tight tracking-tight mb-3">
            Seleccioná un
            <br />
            <span className="text-ember">workflow</span>
          </h1>
          <p className="text-[#555] text-[13px] leading-relaxed">
            Cada workflow orquesta un conjunto de skills de IA para producir un
            entregable listo para el cliente.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {WORKFLOWS.map((wf) => (
            <WorkflowCard key={wf.id} {...wf} />
          ))}
        </div>
      </div>
    </div>
  );
}
