import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#70cfdb",
        secondary: "#FFFFFFFF",
      },
      fontFamily: {
        sans: ["Montserrat", "Arial", "sans-serif"], // Agrega Montserrat como fuente principal
      },
    },
  },
  plugins: [],
} satisfies Config;
