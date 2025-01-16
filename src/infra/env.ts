import { z } from 'zod'

import 'dotenv/config'

export const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3333),

  DATABASE_SSL: z.enum(['disable', 'allow', 'prefer', 'require']).default('disable'),
  DATABASE_PORT: z.coerce.number().default(3333),
  DATABASE_HOST: z.string().default('localhost'),
  DATABASE_USER: z.string().default('postgres'),
  DATABASE_NAME: z.string().default('postgres'),
  DATABASE_PASSWORD: z.string().default('postgres'),
  DATABASE_URL: z.string().min(1),
})

export const env = envSchema.parse(process.env)
