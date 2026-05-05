"use client";

import { useState } from "react";
import IntakeForm from "./IntakeForm";
import Processing from "./Processing";
import Results from "./Results";
import { INITIAL_FORM } from "./constants";
import type { FormData, TrendsData, EmailsData, Step } from "./types";

export default function WorkflowB() {
  const [step, setStep] = useState<Step>("intake");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [processingIdx, setProcessingIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);
  const [emailsData, setEmailsData] = useState<EmailsData | null>(null);
  const [activeEmail, setActiveEmail] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onChange =
    (field: keyof FormData) =>
    (val: string) =>
      setForm((p) => ({ ...p, [field]: val }));

  const handleRun = async () => {
    setStep("processing");
    setError(null);
    setProcessingIdx(0);
    setProgress(5);

    try {
      // Step 1: trends
      setProcessingIdx(0);
      setProgress(15);

      const trendsRes = await fetch("/api/workflow-b/trends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form }),
      });

      if (!trendsRes.ok) {
        const body = await trendsRes.json().catch(() => ({}));
        throw new Error(body.error ?? `Error de tendencias: ${trendsRes.status}`);
      }

      const { trends } = (await trendsRes.json()) as { trends: TrendsData };
      setTrendsData(trends);
      setProgress(40);

      // Step 2: emails
      setProcessingIdx(1);
      setProgress(55);

      const emailsRes = await fetch("/api/workflow-b/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, trends }),
      });

      if (!emailsRes.ok) {
        const body = await emailsRes.json().catch(() => ({}));
        throw new Error(body.error ?? "No se pudo generar la secuencia.");
      }

      const { emails } = (await emailsRes.json()) as { emails: EmailsData };
      setEmailsData(emails);
      setProgress(100);

      // Step 3: done
      setProcessingIdx(2);
      setTimeout(() => {
        setStep("results");
        setActiveEmail(0);
      }, 600);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
      setStep("intake");
    }
  };

  const handleNew = () => {
    setStep("intake");
    setForm(INITIAL_FORM);
    setTrendsData(null);
    setEmailsData(null);
    setError(null);
    setProgress(0);
    setProcessingIdx(0);
  };

  if (step === "processing") {
    return (
      <Processing
        clientName={form.clientName}
        processingIdx={processingIdx}
        progress={progress}
      />
    );
  }

  if (step === "results" && trendsData && emailsData) {
    return (
      <Results
        clientName={form.clientName}
        trendsData={trendsData}
        emailsData={emailsData}
        activeEmail={activeEmail}
        onSelectEmail={setActiveEmail}
        onNew={handleNew}
      />
    );
  }

  return (
    <IntakeForm
      form={form}
      onChange={onChange}
      onSubmit={handleRun}
      error={error}
    />
  );
}
