import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Editorial Almanac palette — source of truth in globals.css :root
        ink: "var(--ink)",
        cream: "var(--cream)",
        paper: "var(--paper)",
        moss: "var(--moss)",
        "moss-deep": "var(--moss-deep)",
        leaf: "var(--leaf)",
        soil: "var(--soil)",
        terracotta: "var(--terracotta)",
      },
      fontFamily: {
        serif: "var(--font-serif)",
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      fontSize: {
        "display-xl": ["64px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["52px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["44px", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        h1: ["36px", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        h2: ["28px", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        h3: ["22px", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        lede: ["20px", { lineHeight: "1.55" }],
        micro: ["11px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      maxWidth: {
        prose: "680px",
        canvas: "1024px",
        wide: "1280px",
      },
      transitionDuration: {
        fast: "150ms",
        medium: "300ms",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.2, 0.6, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
