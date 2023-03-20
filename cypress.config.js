import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'zvfz68',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  watchForFileChanges: false,
});
