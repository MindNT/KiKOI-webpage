/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-brown': '#3E2723',
        'brand-orange': '#CE5C28',
        'brand-light': '#F5F5F5',
        'brand-gold': '#B8860B',
        'brand-dark': '#2C2C2C',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}