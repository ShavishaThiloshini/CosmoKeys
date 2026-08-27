/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': '#050816',
        'space-surface': '#0B1026',
        'cosmic-purple': '#7C3AED',
        'nebula-violet': '#A855F7',
        'cosmic-blue': '#38BDF8',
        'star-white': '#F8FAFC',
        'moon-gray': '#94A3B8',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
