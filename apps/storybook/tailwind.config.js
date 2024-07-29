/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  // eslint-disable-next-line global-require
  presets: [require('@bit-ocean/tailwind')]
}
