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
      _DOM: path.resolve(__dirname, './src/domain'),
      _DOMApp: path.resolve(__dirname, './src/domain/application'),
      _DOMEnt: path.resolve(__dirname, './src/domain/enterprise'),
      _COR: path.resolve(__dirname, './src/core'),
      _TEST: path.resolve(__dirname, './src/__tests__'),
    },
  },
})
