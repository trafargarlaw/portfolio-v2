// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css", "remixicon/fonts/remixicon.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/content"],
  content: {
    highlight: {
      theme: "github-dark",
      preload: ["ts"],
    },
    documentDriven: true,
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});
