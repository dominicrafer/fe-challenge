// https://nuxt.com/docs/api/configuration/nuxt-config
import packageJSON from "./package.json";
import quasarConfig from "./quasar.config";
export default defineNuxtConfig({
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          OpenSans: [400, 500, 600, 700],
          Lato: [100, 300],
        },
      },
    ],
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-quasar-ui",
  ],
  quasar: quasarConfig,
  css: [
    "@/assets/css/main.css",
    "@/assets/css/date-picker.css",
    "@/assets/css/table.css",
    "@/assets/css/select.css",
    "@/assets/css/pagination.css",
    "@/assets/css/vue3-toastify.css",
  ],
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      "postcss-nested": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      app_version: packageJSON.version,
      api_base_url: process.env.API_URL,
    },
  },
  components: [
    {
      path: "~/components", // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],
  tailwindcss: {
    exposeConfig: true,
  },
});
