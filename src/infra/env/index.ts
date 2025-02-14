import type { TDataBaseLog } from '@INFTypes/http/config/database'

import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),

  SERVER_PORT: z.coerce.number().default(3333),

  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),

  DATABASE_SSL: z.enum(['disable', 'allow', 'prefer', 'require']).default('disable'),
  DATABASE_PORT: z.coerce.number().default(3333),
  DATABASE_HOST: z.string().default('localhost'),
  DATABASE_USER: z.string().default('postgres'),
  DATABASE_NAME: z.string().default('postgres'),
  DATABASE_PASSWORD: z.string().default('postgres'),
  DATABASE_URL: z.string().min(1),
  DATABASE_LOG: z
    .string()
    .optional()
    .transform((log) => {
      return log
        ?.toLowerCase()
        .replace(/\s+/g, '')
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item !== '')
    })
    .pipe(z.custom<TDataBaseLog>()),
})

const { data, error } = envSchema.safeParse(process.env)

if (error) {
  console.error('Invalid environment variavles', error.format())
  throw new Error('Invalid environment variavles')
}

export const env = data
