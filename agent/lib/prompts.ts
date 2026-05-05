import type { TrendsData, FormData } from "@/components/workflow-b/types";

export function trendsPrompt(form: Pick<FormData, "niche" | "product" | "audience">): string {
  return `Research current market trends for the "${form.niche}" niche in 2025. Context: marketing "${form.product}" targeted to "${form.audience}".

Return ONLY valid JSON, no markdown, no explanation:
{
  "top_trends": [
    {"title": "string", "description": "2 sentences", "relevance": "1 sentence", "urgency": "high|medium|low"}
  ],
  "buying_language": ["phrase1", "phrase2", "phrase3", "phrase4"],
  "market_context": "2-3 sentence summary of the current market moment",
  "pain_points": ["pain1", "pain2", "pain3"]
}

Include exactly 3 top_trends.`;
}

export function emailsPrompt(form: FormData, trends: TrendsData): string {
  return `Eres un copywriter experto en email marketing de alto rendimiento. Crea una secuencia de 7 emails de venta en ESPAÑOL para el siguiente cliente.

BRIEF DEL CLIENTE:
- Empresa/Cliente: ${form.clientName}
- Nicho: ${form.niche}
- Producto/Servicio: ${form.product}
- Precio: ${form.price}
- Problema que resuelve: ${form.problem}
- Resultado concreto para el cliente: ${form.result}
- Audiencia objetivo: ${form.audience}
- Tono de marca: ${form.tone}
- Garantía: ${form.guarantee || "No especificada"}

INTELIGENCIA DE MERCADO (úsala para hacer los emails relevantes y oportunos):
Contexto: ${trends.market_context}
Tendencias: ${trends.top_trends.map((t) => `"${t.title}": ${t.description}`).join(" | ")}
Lenguaje real de la audiencia: ${trends.buying_language.join(", ")}
Dolores detectados: ${trends.pain_points.join(", ")}

REGLAS DE COPYWRITING:
- Primera línea siempre genera curiosidad o empatía, NUNCA "Espero que estés bien"
- Párrafos cortos (2-3 líneas máx)
- Usa "tú", nunca "usted"
- Un solo CTA por email
- Incluye PS al final
- Máximo 250 palabras por cuerpo
- Usa {{nombre}} para personalización
- No uses: "gratis", "dinero fácil", "garantizado al 100%"

Devuelve SOLO JSON válido sin markdown ni texto adicional:
{
  "sequence": [
    {
      "number": 1,
      "name": "Bienvenida",
      "objective": "string",
      "timing": "Inmediato",
      "subject_a": "string ≤50 chars",
      "subject_b": "string ≤50 chars",
      "subject_c": "string ≤50 chars",
      "preview_text": "string ≤90 chars",
      "body": "cuerpo completo, párrafos separados por \\n\\n",
      "cta": "texto del botón/enlace",
      "ps": "posdata"
    }
  ]
}

7 emails: Bienvenida(Inmediato), Historia(Día 2), Valor puro(Día 4), Caso de éxito(Día 6), Objeción(Día 8), Urgencia(Día 10), Último aviso(Día 12).`;
}
