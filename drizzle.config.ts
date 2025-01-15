import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  dialect: 'postgresql',
  schema: './src/infra/database/schema/index.ts',

  driver: 'pglite',
  dbCredentials: {
    url: './database/',
  },

  breakpoints: true,
  strict: true,
  verbose: true,
})
