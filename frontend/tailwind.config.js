export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cognac: {
          50:  '#fdf8f6',
          100: '#f5ede6',
          200: '#e8d5c4',
          300: '#d4b49a',
          400: '#bc8c6a',
          500: '#a67150',
          600: '#8b5a3c',
          700: '#6f4530',
          800: '#4a2e1e',
          900: '#2d1a0e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}