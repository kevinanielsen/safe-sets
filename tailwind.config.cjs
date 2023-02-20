/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main": "#177ED7",
        "light": "#E9F1F8",
        "muted": "#C2E5FF",
        "accent": "#13B4A1"
      }
    },
  },
  plugins: [],
}
