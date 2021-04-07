export default {
  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-dev
  dev: process.env.NODE_ENV !== 'production',
  env: {
    favoritesApiBaseUrl: process.env.FAVORITES_API_BASE_URL || 'http://localhost:3030'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Fullstack Developer Demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page:
  // https://go.nuxtjs.dev/config-plugins
  // https://nuxtjs.org/docs/2.x/directory-structure/plugins#vue-plugins
  plugins: [
    '~/plugins/vue-json-csv.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
    // https://google-analytics.nuxtjs.org/
    '@nuxtjs/google-analytics',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'https://randomuser.me/api',
    browserBaseURL: 'https://randomuser.me/api'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    /**
     * As described here:
     * https://github.com/nuxt-community/vuetify-module/issues/101#issuecomment-518577403
     * https://github.com/nuxt-community/vuetify-module/issues/101#issuecomment-724091700
     *
     * Defining options like this will make the Vuetify colors will be
     * bundled by Webpack at build step and, should fixes the error:
     *
     * Cannot find module 'vuetify/es5/util/colors' in /nuxt.config.js
     */
    optionsPath: './vuetify.options.js'
  },

  // https://color-mode.nuxtjs.org/#configuration
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
  },

  // https://google-analytics.nuxtjs.org/setup
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID || 'UA-XXX-X',
    asyncID: async (context) => {
      return process.env.GOOGLE_ANALYTICS_ID || 'UA-XXX-X' 
    },
    dev: process.env.NODE_ENV !== 'production' ? true : false,
    autoTracking: {
      screenview: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://github.com/nuxt-community/vuetify-module/issues/101#issuecomment-724091700
    transpile: [/vuetify/]
  }
}
