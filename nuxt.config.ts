import svgLoader from "vite-svg-loader"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxt/devtools",
    "@nuxt/image-edge",
    "@pinia/nuxt",
  ],
  vite: {
    plugins: [
      svgLoader()
    ]
  }
})
