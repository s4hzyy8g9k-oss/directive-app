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
        gold: "#C5A059",
        champagne: "#C5A059",
        cyan: "#38BDF8",
        steel: "#9FB1CC",
        coral: "#F87171",
        macro: { protein: "#34D399", carbs: "#38BDF8", fat: "#F59E0B" },
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
