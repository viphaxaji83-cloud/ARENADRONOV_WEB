import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        bg: {
          base: "hsl(var(--color-bg-base) / <alpha-value>)",
          surface: "hsl(var(--color-bg-surface) / <alpha-value>)",
          elevated: "hsl(var(--color-bg-elevated) / <alpha-value>)",
          overlay: "hsl(var(--color-bg-overlay) / <alpha-value>)",
        },
        fg: {
          primary: "hsl(var(--color-fg-primary) / <alpha-value>)",
          secondary: "hsl(var(--color-fg-secondary) / <alpha-value>)",
          muted: "hsl(var(--color-fg-muted) / <alpha-value>)",
          inverse: "hsl(var(--color-fg-inverse) / <alpha-value>)",
        },
        border: {
          subtle: "hsl(var(--color-border-subtle) / <alpha-value>)",
          strong: "hsl(var(--color-border-strong) / <alpha-value>)",
          focus: "hsl(var(--color-border-focus) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent) / <alpha-value>)",
          hover: "hsl(var(--color-accent-hover) / <alpha-value>)",
          muted: "hsl(var(--color-accent-muted) / <alpha-value>)",
          fg: "hsl(var(--color-accent-fg) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--color-success) / <alpha-value>)",
          muted: "hsl(var(--color-success-muted) / <alpha-value>)",
          fg: "hsl(var(--color-success-fg) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--color-warning) / <alpha-value>)",
          muted: "hsl(var(--color-warning-muted) / <alpha-value>)",
          fg: "hsl(var(--color-warning-fg) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "hsl(var(--color-danger) / <alpha-value>)",
          muted: "hsl(var(--color-danger-muted) / <alpha-value>)",
          fg: "hsl(var(--color-danger-fg) / <alpha-value>)",
        },
        info: {
          DEFAULT: "hsl(var(--color-info) / <alpha-value>)",
          muted: "hsl(var(--color-info-muted) / <alpha-value>)",
          fg: "hsl(var(--color-info-fg) / <alpha-value>)",
        },
      },
      borderRadius: {
        none: "0",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "9999px",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        glow: "var(--shadow-glow)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.05" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(8px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out",
        "slide-up": "slide-up 300ms ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
