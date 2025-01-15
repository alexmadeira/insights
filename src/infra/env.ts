import { z } from 'zod'

import 'dotenv/config'

export const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)
