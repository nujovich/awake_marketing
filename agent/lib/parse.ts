import type Anthropic from "@anthropic-ai/sdk";

export function extractText(
  response: Anthropic.Messages.Message
): string {
  return response.content
    .filter((b): b is Anthropic.Messages.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
}

export function parseJSON<T>(text: string): T {
  const clean = text.replace(/```json\n?|```\n?/g, "").trim();
  const match = clean.match(/{[\s\S]*}|\[[\s\S]*\]/);
  if (match) return JSON.parse(match[0]) as T;
  return JSON.parse(clean) as T;
}
