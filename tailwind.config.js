/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'racing-green': '#002929',
        'tan': '#FDE3BC'
      },
    },
  },
  plugins: [],
}