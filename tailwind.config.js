/** @type {import('tailwindcss').Config} */
module.exports = {
  name: "tailwind-config",
  mode: "jit",
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
        body: ['"Open Sans"'],
      },
      colors: {
        primary: "#29345B",
        secondary: "#838295",
        paprika: "#E45959",
        salmon: "#FFEAEA",
        kale: "#5A8662",
        cucumber: "#F1FAEE",
        soap: "#407B95",
        bubbles: "#E6F6FF",
        currant: "#413C3C",
        flour: "#F8F8F8",
        "baking-soda": "#E5E5E5",
        gainsboro: "#DBDEDA",
        mackerel: "#9B9B9B",
        mint: "#41B883",
        "pastel-red": "#FF6A6A",
      },
    },
  },
  plugins: [],
};
