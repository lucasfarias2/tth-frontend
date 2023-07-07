/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}', './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOutDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
      animation: {
        slideInUp: 'slideInUp 0.25s ease-in-out',
        slideOutDown: 'slideOutDown 0.25s ease-in-out',
      },
    },
  },
};
