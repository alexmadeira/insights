import path from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    reporters: ['verbose'],
    dir: './src/__tests__',
    include: ['./**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    includeTaskLocation: true,
    coverage: {
      reporter: 'html-spa',
      include: ['src/**'],
      exclude: ['**/@types/**', '**/__tests__/**'],
    },
  },
  resolve: {
    alias: {
      '@DOMTypes': path.resolve(__dirname, './src/domain/@types'),
      '@CORTypes': path.resolve(__dirname, './src/core/@types'),
      '@INFTypes': path.resolve(__dirname, './src/infra/@types'),
      _DOM: path.resolve(__dirname, './src/domain'),
      _COR: path.resolve(__dirname, './src/core'),
      _INF: path.resolve(__dirname, './src/infra'),
      _TEST: path.resolve(__dirname, './src/__tests__'),
    },
  },
})
