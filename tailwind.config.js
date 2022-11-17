/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        code: ["Fira Code", "monospace"],
      },
      fontWeight: {
        retina: "450",
      },
      colors: {
        primary: {
          "rich-black-1": "#01080E",
          "maastricht-blue": "#011627",
          "rich-black-2": "#011221",
        },
        secondary: {
          "blue-gray": "#607B96",
          "blue-green": "#3C9D93",
          "blue-violet": "#4D5BCE",
        },
        accent: {
          "orange-yellow": "#FEA55F",
          "green-cyan": "#43D9AD",
          "orange-red": "#E99287",
          purple: "#C98BDF",
        },
        lines: "#1E2D3D",
      },
    },
  },
  plugins: [],
};
