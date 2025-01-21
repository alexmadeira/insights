import type { TDataBaseLog } from '@INFTypes/http/config/database'

import { z } from 'zod'

export const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3333),

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

export const env = envSchema.parse(process.env)
