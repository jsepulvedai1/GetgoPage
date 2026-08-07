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
        getgoBlue: "#000080",
        getgoPink: "#db2392",
        getgoCyan: "#70cfdb",
        getgoYellow: "#f7da3a",
        getgoBg: "#f4f9fd",
        primary: "#000080",
        secondary: "#db2392",
        comp: "#70cfdb",
        customBlue: "#000080",
      },
      fontFamily: {
        sans: ["Montserrat", "Arial", "sans-serif"],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 128, 0.08)',
        'pink-glow': '0 10px 30px -5px rgba(219, 35, 146, 0.3)',
        'blue-glow': '0 10px 30px -5px rgba(0, 0, 128, 0.3)',
      }
    },
  },
  plugins: [],
} satisfies Config;

