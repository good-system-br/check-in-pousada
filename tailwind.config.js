export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{tsx,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', '"Lato"', 'sans-serif'],
      },
      colors: {
        sand: {
          50: '#F9F8F6',
          100: '#F2F0EB',
          200: '#E6E2DA',
          300: '#D5CEC0',
          400: '#BDB3A0',
          500: '#A3967F',
          600: '#857861',
          700: '#6B6451',
          750: '#63584A',
          800: '#5C5242',
          900: '#3D362B',
        },
        charcoal: {
          800: '#2C2C2C',
          900: '#1A1A1A',
        },
      },
      boxShadow: {
        card: '0 10px 30px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
