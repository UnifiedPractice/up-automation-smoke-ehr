import { defineConfig } from 'cypress'

export default defineConfig({
  video: true,
  projectId: "5euxj8",
  pageLoadTimeout: 140000,
  retries: {
    runMode: 10,
    openMode: 10
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    supportFile: false,
    specPattern: [
        'cypress/e2e/Tests/Reports/*.spec.ts',
        'cypress/e2e/Tests/Calendar/*.spec.ts',
        'cypress/e2e/Tests/Patient List/*.spec.ts',
        ]
  },
})

