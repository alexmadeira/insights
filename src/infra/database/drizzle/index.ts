import { env } from '_INF/env'
import { defineConfig } from 'drizzle-kit'

import { Connection } from './connection'

export const drizzle = Connection.create({
  ssl: env.DATABASE_SSL,
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  name: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
})

export default defineConfig({
  out: './migrations/drizzle',
  dialect: 'postgresql',
  schema: './src/infra/database/drizzle/schema/index.ts',

  dbCredentials: {
    url: drizzle.connectionUrl,
  },
})
