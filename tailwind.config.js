/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ охватывает ВСЕ твои компоненты
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
