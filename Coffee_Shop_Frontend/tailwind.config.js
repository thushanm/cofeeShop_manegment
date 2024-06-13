/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      abc:['PT Sans Caption', 'ns-serif' ],
      cde: ['Roboto', 'sans-serif'],
      AA: ['Kodchasan', 'sans-serif'],
      round:['Baloo 2', 'sans-serif'],
      pop:['Poppins', 'sans-serif'],
      head:["Pacifico", 'cursive'],
      Robot:['Roboto', 'sans-serif'],
      Index:["Roboto", 'sans-serif']
    }
  },
  plugins: [],
}
