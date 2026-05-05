"use client";

import { PROCESSING_STEPS } from "./constants";

interface ProcessingProps {
  clientName: string;
  processingIdx: number;
  progress: number;
}

export default function Processing({
  clientName,
  processingIdx,
  progress,
}: ProcessingProps) {
  return (
    <div className="min-h-screen bg-[#070707] text-[#F0EDE8] font-mono flex flex-col items-center justify-center px-8">
      <style>{`@media print { body { display: none; } }`}</style>

      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
            <span className="text-[10px] tracking-[3px] uppercase text-[#666]">
              Agente activo
            </span>
          </div>
          <h2 className="text-[22px] font-bold leading-snug">
            Generando campaña
            <br />
            para {clientName || "el cliente"}...
          </h2>
        </div>

        {/* Progress bar */}
        <div className="bg-[#111] rounded-full h-[3px] mb-10 overflow-hidden">
          <div
            className="h-full bg-ember rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-4">
          {PROCESSING_STEPS.map((s, i) => {
            const isDone = i < processingIdx;
            const isActive = i === processingIdx;
            return (
              <div
                key={s.id}
                className="flex items-center gap-4 transition-opacity duration-300"
                style={{ opacity: i > processingIdx ? 0.25 : 1 }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300"
                  style={{
                    borderColor: isDone
                      ? "#4ADE80"
                      : isActive
                      ? "#FF4500"
                      : "#222",
                    background: isDone ? "#0E2A1A" : "transparent",
                  }}
                >
                  {isDone ? (
                    <span className="text-[#4ADE80] text-[12px]">✓</span>
                  ) : isActive ? (
                    <span className="text-ember text-[10px]">●</span>
                  ) : (
                    <span className="text-[#333] text-[10px]">○</span>
                  )}
                </div>
                <div>
                  <div
                    className="text-[13px] transition-colors"
                    style={{
                      color: isDone ? "#666" : isActive ? "#F0EDE8" : "#333",
                    }}
                  >
                    {s.label}
                  </div>
                  <div className="text-[10px] text-[#333] tracking-wide mt-0.5">
                    {s.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
