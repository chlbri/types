import { aliasTs } from '@bemedev/vitest-alias';
import { exclude } from '@bemedev/vitest-exclude';
import { defineConfig } from 'vitest/config';

import tsconfig from './tsconfig.json';
export default defineConfig({
  plugins: [
    aliasTs(tsconfig as any),
    exclude({
      ignoreCoverageFiles: [
        './src/cli/**/*',
        '**/index.ts',
        '**/*.types.ts',
      ],
      ignoreTestFiles: [],
    }),
  ],
  test: {
    bail: 10,
    maxConcurrency: 10,
    passWithNoTests: true,
    slowTestThreshold: 3000,
    globals: true,
    coverage: {
      enabled: true,
      extension: 'ts',
      reportsDirectory: '.coverage',
      all: true,
      provider: 'v8',
    },
    typecheck: {
      enabled: true,
      ignoreSourceErrors: true,
    },
    logHeapUsage: true,
  },
});
