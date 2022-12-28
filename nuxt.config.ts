// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  css: ["@/assets/css/main.css"],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    config: {},
  },
  components: [
    {
      path: "~/components", // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],
});
