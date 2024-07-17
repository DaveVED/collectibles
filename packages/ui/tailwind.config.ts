import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx,md,js}"],
  prefix: "ui-",
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        gray: {
          700: "#4a5568",
          300: "#e2e8f0",
        },
      },
      fontSize: {
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
    },
  },
};

export default config;
