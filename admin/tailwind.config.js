/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Design system — matches the public website
        ivory: {
          DEFAULT: "#F5F3EF",
          dark: "#EDE9E1",
        },
        charcoal: {
          DEFAULT: "#111111",
          light: "#333333",
          muted: "#666666",
        },
        gold: {
          DEFAULT: "#C8964A",
          light: "#D9AF72",
          dark: "#A67838",
        },
        sidebar: "#1A1A1A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
