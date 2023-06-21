import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

module.exports = defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    testIsolation: false,
    supportFile: false
  }
});
