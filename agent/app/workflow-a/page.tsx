import Link from "next/link";

export default function WorkflowA() {
  return (
    <div className="min-h-screen bg-[#070707] font-mono text-[#F0EDE8] flex flex-col items-center justify-center px-8">
      <div className="text-center max-w-md">
        <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#1A1A1A] flex items-center justify-center text-lg font-bold text-[#444] mx-auto mb-6">
          A
        </div>
        <h1 className="text-2xl font-bold mb-3">Cliente nuevo</h1>
        <p className="text-[#666] text-sm leading-relaxed mb-8">
          Este workflow está en desarrollo. Próximamente podrás generar el diagnóstico ikigai, análisis de tendencias y entregable PDF para nuevos clientes.
        </p>
        <div className="flex gap-3 justify-center flex-wrap mb-6">
          {["ikigai", "tendencias", "beautiful-pdf"].map((s) => (
            <span key={s} className="text-[9px] tracking-wide px-2 py-1 border border-[#1F1F1F] rounded-full text-[#444]">
              {s}
            </span>
          ))}
        </div>
        <Link href="/" className="text-[11px] tracking-widest uppercase text-[#555] hover:text-[#F0EDE8] transition-colors">
          ← Volver al selector
        </Link>
      </div>
    </div>
  );
}
