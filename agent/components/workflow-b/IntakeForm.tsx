"use client";

import Field from "@/components/ui/Field";
import { TONES, TEST_CASES } from "./constants";
import type { FormData } from "./types";

interface IntakeFormProps {
  form: FormData;
  onChange: (field: keyof FormData) => (val: string) => void;
  onSubmit: () => void;
  error: string | null;
}

export default function IntakeForm({
  form,
  onChange,
  onSubmit,
  error,
}: IntakeFormProps) {
  const isValid =
    form.clientName &&
    form.niche &&
    form.product &&
    form.price &&
    form.problem &&
    form.result &&
    form.audience;

  return (
    <div className="min-h-screen bg-[#070707] text-[#F0EDE8] font-mono">
      <style>{`@media print { body { display: none; } }`}</style>

      {/* Header */}
      <div className="border-b border-[#1A1A1A] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-ember" />
          <span className="text-[10px] tracking-[3px] uppercase text-[#666]">
            Marketing Agent
          </span>
        </div>
        <span className="text-[10px] text-[#333] tracking-widest">
          WORKFLOW B — CAMPAÑA EMAIL
        </span>
      </div>

      <div className="max-w-[680px] mx-auto px-8 py-12">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-[32px] font-bold leading-tight tracking-tight mb-3">
            Campaña de
            <br />
            <span className="text-ember">Email Marketing</span>
          </h1>
          <p className="text-[#555] text-[13px] leading-relaxed">
            Completá el brief del cliente. El agente investigará tendencias y
            generará una secuencia de 7 emails lista para usar.
          </p>
        </div>

        {/* Test case selector */}
        <div className="mb-8">
          <p className="text-[10px] tracking-[2px] uppercase text-[#444] mb-2.5">
            — Cargar caso de prueba
          </p>
          <div className="flex flex-col gap-1.5">
            {TEST_CASES.map((tc, i) => (
              <button
                key={i}
                onClick={() => {
                  Object.entries(tc.data).forEach(([k, v]) =>
                    onChange(k as keyof FormData)(v)
                  );
                }}
                className="text-left bg-[#0C0C0C] border border-[#1A1A1A] rounded-lg px-4 py-2.5 text-[#777] text-[12px] cursor-pointer hover:border-[#2A2A2A] hover:text-[#999] transition-all"
              >
                {tc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills badges */}
        <div className="flex gap-2 mb-9 flex-wrap">
          {["espia-tendencias", "emails-venta", "beautiful-pdf"].map((s) => (
            <span
              key={s}
              className="text-[10px] tracking-wide px-2.5 py-1 border border-[#1F1F1F] rounded-full text-[#555]"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-[#1A0A0A] border border-[#3A1A1A] rounded-lg px-4 py-3 mb-6 text-[#F87171] text-[13px]">
            ⚠ {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl p-7">
          <p className="text-[10px] tracking-[2px] uppercase text-ember mb-6 mt-0">
            — Datos del cliente
          </p>

          <div className="grid grid-cols-2 gap-x-5">
            <Field
              label="Empresa / Cliente"
              value={form.clientName}
              onChange={onChange("clientName")}
              placeholder="ej. Agencia Nube"
              required
            />
            <Field
              label="Nicho / Industria"
              value={form.niche}
              onChange={onChange("niche")}
              placeholder="ej. Marketing digital B2B"
              required
            />
          </div>

          <Field
            label="Producto o Servicio"
            value={form.product}
            onChange={onChange("product")}
            placeholder="ej. Consultoría de automatización de ventas"
            required
          />

          <div className="grid grid-cols-2 gap-x-5">
            <Field
              label="Precio"
              value={form.price}
              onChange={onChange("price")}
              placeholder="ej. $1.500 USD / mes"
              required
            />
            <Field
              label="Garantía"
              value={form.guarantee}
              onChange={onChange("guarantee")}
              placeholder="ej. 30 días de prueba"
            />
          </div>

          <Field
            label="Problema que resuelve"
            value={form.problem}
            onChange={onChange("problem")}
            placeholder="ej. Equipos de ventas que pierden tiempo en tareas manuales"
            tag="textarea"
            required
          />
          <Field
            label="Resultado concreto para el cliente"
            value={form.result}
            onChange={onChange("result")}
            placeholder="ej. Reducción del 60% del tiempo en seguimiento de leads en 30 días"
            tag="textarea"
            required
          />
          <Field
            label="Audiencia objetivo"
            value={form.audience}
            onChange={onChange("audience")}
            placeholder="ej. Directores comerciales de empresas B2B con equipo de 5-20 personas"
            tag="textarea"
            required
          />
          <Field
            label="Tono de marca"
            value={form.tone}
            onChange={onChange("tone")}
            tag="select"
            options={TONES}
          />
        </div>

        {/* CTA */}
        <button
          onClick={onSubmit}
          disabled={!isValid}
          className={[
            "mt-6 w-full py-4 rounded-lg text-[13px] tracking-[2px] uppercase font-bold transition-all",
            isValid
              ? "bg-ember text-white cursor-pointer hover:opacity-90"
              : "bg-[#1A1A1A] text-[#333] cursor-not-allowed",
          ].join(" ")}
        >
          {isValid ? "→ Activar Agente" : "Completá todos los campos requeridos"}
        </button>

        <p className="text-center text-[#333] text-[11px] mt-3">
          El agente tardará aproximadamente 30–60 segundos
        </p>
      </div>
    </div>
  );
}
