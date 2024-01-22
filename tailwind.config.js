/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: "Nunito",
      },
      keyframes: {
        'open-div': {
          '0%': { 'opacity': '0' },
          '80%': { 'opacity': '0.8' },
          '100%': { 'opacity': '1' },
        },
        'open-bar': {
          '0%': { 'transform': 'scaleX(0.2)'},
          '100%': { 'transform': 'scaleX(1)'}
        }
      },
      animation: {
        'open-div': 'open-div 1s ease-in-out forwards',
        'open-bar': 'open-bar 0.8s ease-in-out forwards'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
