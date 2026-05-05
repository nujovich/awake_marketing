import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        agent: "#070707",
        card: "#0C0C0C",
        "card-hover": "#111111",
        ember: "#FF4500",
        success: "#4ADE80",
        "text-base": "#F0EDE8",
        "text-muted": "#666666",
        "text-dim": "#333333",
        "border-subtle": "#1F1F1F",
      },
      fontFamily: {
        mono: ["'Courier New'", "Courier", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
