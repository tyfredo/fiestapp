/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      // Esta es la que usaremos para "Renata"
      script: ['"Great Vibes"', 'cursive'],
      // Esta para los textos elegantes de fechas y padres
      serif: ['"Playfair Display"', 'serif'],
    },
    colors: {
      botanical: {
        grass: '#CFAA7D',
        thicket: '#B9AF5F',
        blossom: '#E39B95',
        berry: '#CC7C72',
        sky: '#8096AD',
        parchment: '#F9F6F0',
      }
    }
  },
},
  plugins: [],
}