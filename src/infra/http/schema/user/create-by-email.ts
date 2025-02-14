import { RequestSchema } from '_INFCommon/request-schema'
import z from 'zod'

export const createByEmailSchema = RequestSchema({
  body: z
    .object({
      name: z
        .string()
        .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ'\s]+$/, 'The name must contain only letters and spaces')
        .refine((value) => value.trim().split(' ').length >= 2, {
          message: 'The name must contain at least two names',
        })
        .describe('The new user full name, only letters and spaces and at least two names'),
      email: z.string().email().describe('the new user email'),
      password: z.string().describe('the new user password'),
    })
    .describe('The new user data'),
})
