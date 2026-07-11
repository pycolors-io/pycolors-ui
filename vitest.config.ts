import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}'],
    setupFiles: ['./tests/setup.ts'],
    // React's production build strips `act`, which Testing Library's
    // cleanup relies on. Force the test-only NODE_ENV regardless of the
    // invoking shell/CI job's ambient value (e.g. release.yml sets
    // NODE_ENV=production at the job level for build steps).
    env: {
      NODE_ENV: 'test',
    },
  },
});
