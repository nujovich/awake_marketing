import { NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { trendsPrompt } from "@/lib/prompts";
import { extractText, parseJSON } from "@/lib/parse";
import type { FormData, TrendsData } from "@/components/workflow-b/types";

export const maxDuration = 120;

function fallbackTrends(form: Pick<FormData, "niche">): TrendsData {
  return {
    top_trends: [
      {
        title: "Demanda de resultados rápidos",
        description:
          "Las empresas priorizan soluciones con ROI demostrable y rápido. La paciencia del mercado para adoptar nuevas herramientas es cada vez menor.",
        relevance: "Tu producto encaja directamente con esta expectativa.",
        urgency: "high",
      },
      {
        title: "Saturación de opciones",
        description:
          "El mercado está lleno de alternativas, lo que genera confusión en la compra. Los compradores invierten más tiempo en investigar antes de decidir.",
        relevance: "Una propuesta clara y diferenciada tiene ventaja.",
        urgency: "medium",
      },
      {
        title: "Confianza como activo diferencial",
        description:
          "Los compradores valoran prueba social y casos de éxito reales. El escepticismo ante las promesas de marketing está en su punto más alto.",
        relevance: "Testimonios concretos son clave para convertir.",
        urgency: "high",
      },
    ],
    buying_language: [
      "resultados probados",
      "sin complicaciones",
      "soporte real",
      "retorno medible",
    ],
    market_context: `El mercado de ${form.niche} está en transformación activa. La demanda por soluciones que generen resultados medibles y rápidos es más alta que nunca, y los compradores son más exigentes en cuanto a prueba social y confianza.`,
    pain_points: [
      "falta de tiempo",
      "presupuesto limitado",
      "resultados inconsistentes",
    ],
  };
}

export async function POST(req: Request) {
  try {
    const { form } = (await req.json()) as { form: FormData };

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      messages: [{ role: "user", content: trendsPrompt(form) }],
    });

    const text = extractText(response);

    try {
      const trends = parseJSON<TrendsData>(text);
      return NextResponse.json({ trends });
    } catch {
      return NextResponse.json({ trends: fallbackTrends(form) });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
