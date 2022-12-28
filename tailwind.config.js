/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Open Sans"']
      },
      colors: {
        primary: '#29335C',
        paprika: '#E45959',
        salmon: '#FFEAEA',
        kale: '#5A8662',
        cucumber: '#F1FAEE',
        soap: '#407B95',
        bubbles: '#E6F6FF',
        currant: '#413C3C'
      },
    },
  },
  plugins: [],
}