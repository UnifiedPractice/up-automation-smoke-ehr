import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  pageLoadTimeout: 140000,
  // retries: {
  //   runMode: 900,
  //   openMode: 900
  // },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    supportFile: false,
    specPattern: 'cypress/e2e/Tests/*.spec.ts',
  },
})

