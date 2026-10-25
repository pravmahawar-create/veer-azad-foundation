/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0b1d3a',
          'navy-dark': '#071224',
          'navy-light': '#162e56',
          gold: '#cda037',
          'gold-light': '#f5df97',
          'gold-dark': '#a67c1e',
          saffron: '#f97316',
          'saffron-dark': '#ea580c',
          cream: '#faf7f2',
          'cream-dark': '#f0ebe1'
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
