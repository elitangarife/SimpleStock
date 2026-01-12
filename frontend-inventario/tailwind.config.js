/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // busca clases Tailwind en tu carpeta src
    "./pages/**/*.{js,ts,jsx,tsx}", // si usas pages router
    "./components/**/*.{js,ts,jsx,tsx}", // cualquier componente
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
