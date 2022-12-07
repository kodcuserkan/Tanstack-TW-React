/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: ['even'],
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      display: ['Montserrat', 'sans-serif'],
      body: ['Montserrat', 'sans-serif']
    }
  },
  plugins: []
};
