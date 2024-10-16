// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets" | "theme" | "darkMode"> = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-mode="dark"]'], // Use 'class' selector strategy  presets: [sharedConfig],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },
    extend: {
      colors: {
        darkBackground: "#1A202C", // Your dark mode background color
        primary: {
          DEFAULT: "#5865F2", // Comfort Purple
          light: "#9AA0F9",
          dark: "#4752C4", // Used for hover:bg-primary-dark
        },
        secondary: {
          DEFAULT: "#72767D",
          light: "#A3A6AD",
          dark: "#5A5E66",
        },
        accent: "#43B581",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.625rem", // 10px
        "1xs": "0.5rem", // 8px
      },
      spacing: {
        "0.25": "0.0625rem", // 1px
      },
    },
  },
};

export default config;
