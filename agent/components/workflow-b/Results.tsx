"use client";

import { EMAIL_META } from "./constants";
import type { TrendsData, EmailsData } from "./types";

interface ResultsProps {
  clientName: string;
  trendsData: TrendsData;
  emailsData: EmailsData;
  activeEmail: number;
  onSelectEmail: (i: number) => void;
  onNew: () => void;
}

export default function Results({
  clientName,
  trendsData,
  emailsData,
  activeEmail,
  onSelectEmail,
  onNew,
}: ResultsProps) {
  const seq = emailsData.sequence;
  const email = seq[activeEmail];

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-[#070707] text-[#F0EDE8] font-mono">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { page-break-inside: avoid; }
          body { background: white !important; color: black !important; }
        }
      `}</style>

      {/* Sticky header */}
      <div className="no-print border-b border-[#1A1A1A] px-7 py-3.5 flex items-center justify-between sticky top-0 bg-[#070707] z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
          <span className="text-[10px] tracking-[3px] uppercase text-[#666]">
            Campaña generada
          </span>
          <span className="text-[10px] text-[#333]">— {clientName}</span>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={onNew}
            className="bg-transparent border border-[#1F1F1F] text-[#666] px-4 py-1.5 rounded-md text-[11px] cursor-pointer hover:border-[#333] hover:text-[#888] transition-all tracking-wide"
          >
            ← Nuevo
          </button>
          <button
            onClick={handlePrint}
            className="bg-ember border-none text-white px-4 py-1.5 rounded-md text-[11px] cursor-pointer font-bold tracking-wide hover:opacity-90 transition-opacity"
          >
            ↓ Exportar PDF
          </button>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-7 py-8 grid grid-cols-[260px_1fr] gap-6">
        {/* Sidebar */}
        <div className="no-print">
          {/* Email list */}
          <div className="mb-5">
            <p className="text-[9px] tracking-[2px] uppercase text-[#444] mb-3">
              Secuencia de emails
            </p>
            <div className="flex flex-col gap-1">
              {EMAIL_META.map((m, i) => {
                const e = seq[i];
                const isActive = activeEmail === i;
                return (
                  <button
                    key={i}
                    onClick={() => onSelectEmail(i)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left w-full transition-all"
                    style={{
                      background: isActive ? "#111" : "transparent",
                      border: isActive
                        ? `1px solid ${m.color}22`
                        : "1px solid transparent",
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: m.color }}
                    />
                    <div>
                      <div
                        className="text-[12px]"
                        style={{ color: isActive ? "#F0EDE8" : "#555" }}
                      >
                        {m.name}
                      </div>
                      <div className="text-[10px] text-[#333]">
                        {e?.timing || m.timing}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Trends panel */}
          <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl p-4">
            <p className="text-[9px] tracking-[2px] uppercase text-ember mb-3">
              Tendencias detectadas
            </p>
            <div className="flex flex-col gap-2.5">
              {trendsData.top_trends.map((t, i) => (
                <div
                  key={i}
                  className="pl-2.5"
                  style={{
                    borderLeft: `2px solid ${
                      t.urgency === "high"
                        ? "#F87171"
                        : t.urgency === "medium"
                        ? "#FBBF24"
                        : "#4ADE80"
                    }`,
                  }}
                >
                  <div className="text-[11px] text-[#CCC] font-semibold">
                    {t.title}
                  </div>
                  <div className="text-[10px] text-[#444] mt-0.5 leading-relaxed">
                    {t.relevance}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3.5 pt-3.5 border-t border-[#1A1A1A]">
              <p className="text-[9px] tracking-wide uppercase text-[#333] mb-2">
                Lenguaje de la audiencia
              </p>
              <div className="flex flex-wrap gap-1.5">
                {trendsData.buying_language.map((p, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-[#111] border border-[#1F1F1F] rounded-full px-2 py-0.5 text-[#555]"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main: email viewer */}
        {email && (
          <div className="print-area">
            {/* Email meta */}
            <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl px-6 py-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: EMAIL_META[activeEmail]?.color }}
                  />
                  <span className="text-[11px] tracking-[2px] uppercase text-[#555]">
                    Email {email.number} — {email.name}
                  </span>
                </div>
                <span className="text-[11px] text-[#333] bg-[#111] border border-[#1F1F1F] rounded-full px-3 py-1">
                  {email.timing}
                </span>
              </div>

              {/* A/B/C subjects */}
              <div className="flex flex-col gap-2">
                {(["subject_a", "subject_b", "subject_c"] as const).map(
                  (k, i) => (
                    <div key={k} className="flex items-start gap-2.5">
                      <span className="text-[9px] tracking-wide text-[#333] bg-[#111] border border-[#1A1A1A] rounded px-1.5 py-0.5 flex-shrink-0 mt-0.5">
                        {["A", "B", "C"][i]}
                      </span>
                      <span className="text-[13px] text-[#F0EDE8] leading-relaxed">
                        {email[k]}
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* Preview text */}
              <div className="mt-3 pt-3 border-t border-[#1A1A1A]">
                <span className="text-[10px] text-[#444] tracking-wide uppercase">
                  Preview text:{" "}
                </span>
                <span className="text-[12px] text-[#666] italic">
                  {email.preview_text}
                </span>
              </div>
            </div>

            {/* Email body */}
            <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl px-7 py-6 mb-4">
              <p className="text-[9px] tracking-[2px] uppercase text-[#444] mt-0 mb-5">
                Cuerpo del email
              </p>
              <div className="text-[13px] text-[#CCC] leading-[1.8]">
                <p className="mb-4 text-[#888]">Hola {"{{nombre}}"},</p>
                {email.body.split("\n\n").map((para, i) => (
                  <p key={i} className="mb-3.5">
                    {para}
                  </p>
                ))}
                <div className="my-6 py-3.5 border-t border-b border-[#1A1A1A]">
                  <span className="bg-ember text-white px-5 py-2.5 rounded-md text-[12px] inline-block tracking-wide">
                    {email.cta}
                  </span>
                </div>
                <p className="text-[12px] text-[#555] italic">
                  P.D. {email.ps}
                </p>
              </div>
            </div>

            {/* Objective */}
            <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-lg px-4 py-3 flex gap-3 items-start">
              <span className="text-[9px] tracking-wide uppercase text-[#333] pt-0.5">
                Objetivo
              </span>
              <span className="text-[12px] text-[#555] leading-relaxed">
                {email.objective}
              </span>
            </div>

            {/* Navigation */}
            <div className="no-print flex justify-between mt-5">
              <button
                onClick={() => onSelectEmail(Math.max(0, activeEmail - 1))}
                disabled={activeEmail === 0}
                className="bg-transparent border border-[#1F1F1F] px-4 py-2 rounded-md text-[11px] transition-colors"
                style={{
                  color: activeEmail === 0 ? "#222" : "#666",
                  cursor: activeEmail === 0 ? "not-allowed" : "pointer",
                }}
              >
                ← Anterior
              </button>
              <span className="text-[11px] text-[#333] self-center">
                {activeEmail + 1} / {seq.length}
              </span>
              <button
                onClick={() =>
                  onSelectEmail(Math.min(seq.length - 1, activeEmail + 1))
                }
                disabled={activeEmail === seq.length - 1}
                className="bg-transparent border border-[#1F1F1F] px-4 py-2 rounded-md text-[11px] transition-colors"
                style={{
                  color: activeEmail === seq.length - 1 ? "#222" : "#666",
                  cursor:
                    activeEmail === seq.length - 1 ? "not-allowed" : "pointer",
                }}
              >
                Siguiente →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
