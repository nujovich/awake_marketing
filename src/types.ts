// src/types.ts

export type Tier = {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  tagline: string;
  time?: string;
  features: string[];
  badge?: string;
  featured?: boolean;
  cta?: { label: string; href: string };
};

export type CoreStep = {
  letter: string;
  title: string;
  body: string;
  summary?: string;
};
