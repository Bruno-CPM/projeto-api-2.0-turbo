import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef9f8",
          100: "#d5f0ee",
          200: "#aee1dc",
          300: "#7ccbc4",
          400: "#4faea6",
          500: "#36948c",
          600: "#2a7771",
          700: "#24605c",
          800: "#204e4b",
          900: "#1d423f",
          950: "#0c2625",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(12, 38, 37, 0.08)",
        card: "0 4px 20px rgba(12, 38, 37, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
