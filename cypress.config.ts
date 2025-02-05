import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', 

    setupNodeEvents(on, config) {

    },
    specPattern: 'cypress/e2e/**/*.cy.ts', 
  },
});
