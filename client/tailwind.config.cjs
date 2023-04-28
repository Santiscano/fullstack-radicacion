/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003c7b",
        secondary: "#00a7ff",
        tertiary: "#2759cd",
      }
    },
  },
  plugins: [],
}
