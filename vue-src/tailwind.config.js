const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFE860',
        secondary: '#F9831F'
      }
    }
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('>', '& > *');
      addVariant('*', '& *');
    })
  ]
};
