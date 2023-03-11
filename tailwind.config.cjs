const { Calculator } = require('phosphor-react');

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
      },
      fontFamily: {
        "main": ['Inter', 'Open Sans', 'system-ui']
      },
      borderRadius: {
        "main": '16px',
      },
      height: {
        "main": 'calc(100vh - 48px)',
        "main2": 'calc(100% - 64px)',
      },
      width: {
        "template": 'calc(50% - 8px)'
      },
      boxShadow: {
        "main2": '0, 1px, 2px, 0, rgb(0, 0, 0 / 0.3), 0, 2, 6, 2, rgb(0, 0, 0 / 0.15)'
      }
    },
  },
  plugins: [],
}
