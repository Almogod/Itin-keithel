/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          ivory: '#FAF9F6',
          charcoal: '#1A1A1A',
          gold: '#C5A880',
          darkGold: '#9E7A44',
          sand: '#F5EFEB',
          crimson: '#8A1C14',
          borderGold: '#E5DEC9',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 10px 30px -10px rgba(26, 26, 26, 0.08), 0 1px 1px rgba(26, 26, 26, 0.02)',
        glow: '0 0 15px rgba(197, 168, 128, 0.25)',
      }
    },
  },
  plugins: [],
}
