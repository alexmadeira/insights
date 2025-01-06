import z from 'zod'

export const ZPostBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const ZPostParams = z.object({
  company: z.string(),
})
