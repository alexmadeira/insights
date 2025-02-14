import { RequestSchema } from '_INFServices/request-schema'
import z from 'zod'

export const authenticateByIndetifierSchema = RequestSchema({
  body: z
    .object({
      indetifier: z.string().describe('The user indetifier (email or username)'),
      password: z.string().describe('The user password'),
    })
    .describe('The user authentication data'),
})
