import { NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { emailsPrompt } from "@/lib/prompts";
import { extractText, parseJSON } from "@/lib/parse";
import type { FormData, TrendsData, EmailsData } from "@/components/workflow-b/types";

export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    const { form, trends } = (await req.json()) as {
      form: FormData;
      trends: TrendsData;
    };

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [{ role: "user", content: emailsPrompt(form, trends) }],
    });

    const text = extractText(response);

    try {
      const emails = parseJSON<EmailsData>(text);
      return NextResponse.json({ emails });
    } catch {
      return NextResponse.json(
        { error: "No se pudo generar la secuencia. Intentá nuevamente." },
        { status: 500 }
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
