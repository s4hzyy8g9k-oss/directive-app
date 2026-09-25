import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: "#02040C",
        obsidian: "#030612",
        navy: "#0A1630",
        slate: { deep: "#0B1528", mid: "#1B3152" },
        hairline: "#2A3B5C",
        gold: "#D4AF37",
        champagne: "#F1DC9A",
        cyan: "#38BDF8",
        steel: "#9FB1CC",
        coral: "#F87171",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
