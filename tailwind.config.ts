import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#030612",
        slate: {
          deep: "#0B1528",
          mid: "#1B3152",
        },
        hairline: "#2A3B5C",
        gold: "#D4AF37",
        cyan: "#38BDF8",
        paper: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(212,175,55,0.06) 0%, rgba(3,6,18,0) 60%)",
      },
      boxShadow: {
        instrument: "0 0 0 1px #2A3B5C, 0 24px 60px -24px rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
