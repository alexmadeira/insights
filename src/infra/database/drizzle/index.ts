import { env } from '_INF/env'
import { defineConfig } from 'drizzle-kit'

import { DrizzleConnection } from './drizzle-connection'

export default defineConfig({
  out: './migrations/drizzle',
  dialect: 'postgresql',
  schema: './src/infra/database/drizzle/schema/index.ts',

  dbCredentials: {
    url: env.DATABASE_URL,
  },
})

export const drizzle = DrizzleConnection.create(env.DATABASE_URL)
