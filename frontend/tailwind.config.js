/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1f2933',
        paper: '#f8f5ef',
        coffee: '#8b5e34',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(31, 41, 51, 0.12)',
      },
    },
  },
  plugins: [],
};
