export default defineNuxtConfig({
  app: {
    buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
    baseURL: '/vdk/',
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-auth-utils', '@nuxt/eslint', '@pinia/nuxt'],
  ui: {
    icons: ['heroicons', 'simple-icons','ph']
  },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  }
})
