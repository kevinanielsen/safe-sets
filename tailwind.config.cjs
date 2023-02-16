/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#177ed7",
        secondary: "#F4F8FB",
        accent: "#13B4A1",
      }
    },
  },
  plugins: [],
}
