export interface FormData {
  clientName: string;
  niche: string;
  product: string;
  price: string;
  problem: string;
  result: string;
  audience: string;
  tone: string;
  guarantee: string;
}

export interface Trend {
  title: string;
  description: string;
  relevance: string;
  urgency: "high" | "medium" | "low";
}

export interface TrendsData {
  top_trends: Trend[];
  buying_language: string[];
  market_context: string;
  pain_points: string[];
}

export interface Email {
  number: number;
  name: string;
  objective: string;
  timing: string;
  subject_a: string;
  subject_b: string;
  subject_c: string;
  preview_text: string;
  body: string;
  cta: string;
  ps: string;
}

export interface EmailsData {
  sequence: Email[];
}

export type Step = "intake" | "processing" | "results";
