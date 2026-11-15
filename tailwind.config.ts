import type { Config } from "tailwindcss";

export default {
  // Compatible con: document.documentElement.dataset.theme = "dark"
  darkMode: ["selector", '[data-theme="dark"]'],

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#003daa",
        accent: "#00e1f7",

        // Colores adicionales que ya utilizabas
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
        },
        highlight: {
          DEFAULT: "hsl(var(--highlight))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },

      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        float: {
          "50%": { transform: "translateY(-14px)" },
        },

        blob: {
          "50%": {
            transform: "translate(40px, 30px) scale(1.1)",
          },
        },

        shift: {
          to: { backgroundPosition: "200% center" },
        },

        caret: {
          "50%": { borderColor: "transparent" },
        },

        grow: {
          from: { transform: "scaleY(0)" },
        },

        "fade-up": {
          from: {
            opacity: "0",
            transform: "translateY(26px)",
          },
          to: {
            opacity: "1",
            transform: "none",
          },
        },

        pop: {
          "0%": {
            opacity: "0",
            transform: "scale(.7)",
          },
          "70%": {
            transform: "scale(1.06)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },

        "pulse-glow": {
          "0%": {
            boxShadow:
              "0 10px 26px rgba(0,61,170,.35), 0 0 0 0 rgba(0,225,247,.55)",
          },
          "70%": {
            boxShadow:
              "0 10px 26px rgba(0,61,170,.35), 0 0 0 16px rgba(0,225,247,0)",
          },
          "100%": {
            boxShadow:
              "0 10px 26px rgba(0,61,170,.35), 0 0 0 0 rgba(0,225,247,0)",
          },
        },

        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },

        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        float: "float 5s ease-in-out infinite",
        blob: "blob 14s ease-in-out infinite",
        shift: "shift 6s linear infinite",
        caret: "caret .8s steps(1) infinite",
        grow: "grow 1.2s cubic-bezier(.2,.8,.2,1) both",
        "fade-up": "fade-up .8s cubic-bezier(.2,.8,.2,1) both",
        pop: "pop .45s ease-out both",
        "pulse-glow": "pulse-glow 2.4s infinite",
        "spin-slow": "spin 30s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [],
} satisfies Config;
