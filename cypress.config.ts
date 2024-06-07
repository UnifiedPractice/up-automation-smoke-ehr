import { defineConfig } from 'cypress'
import {verifyDownloadTasks} from "cy-verify-downloads";
const { verifyDownloadTasks } = require('cy-verify-downloads');


export default defineConfig({
    video: true,
  projectId: "5euxj8",
  pageLoadTimeout: 140000,
  defaultCommandTimeout: 30000,
  //   retries: {
  //   runMode: 8,
  //   openMode: 8
  // },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
        on('task', verifyDownloadTasks);
        return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: [
        'cypress/e2e/Tests/Reports/*.spec.ts',
        'cypress/e2e/Tests/Calendar/*.spec.ts',
        'cypress/e2e/Tests/Patient List/*.spec.ts',
        'cypress/e2e/Tests/Patient Portal/*.spec.ts',
        'cypress/e2e/Tests/Chat/*.spec.ts',
        'cypress/e2e/Tests/Other/*.spec.ts',



    ]
  },
})

