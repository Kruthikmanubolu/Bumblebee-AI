/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class', // 👈 ADD THIS LINE
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bee-yellow': '#FFC107',
        'bee-yellow-light': '#FFD54F'
      }
    },
    screens: {
      x3s: { max: '375px' },
      xxs: { max: '616px' },
      xs: { max: '774px' },
      sm: { max: '874.99px' },
      md: { min: '875px', max: '1439.98px' },
      lg: { min: '1439.99px' },
    },
  },
  plugins: [],
};

module.exports = config;
