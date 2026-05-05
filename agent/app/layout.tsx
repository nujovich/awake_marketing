import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Awake Marketing Agent",
  description: "Agente interno de marketing — Awake",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
