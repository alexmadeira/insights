import { RequestSchema } from '_INFCommon/request-schema'
import z from 'zod'

export const avatarCreateSchema = RequestSchema({
  body: z
    .object({
      name: z.string().describe('Company ID'),
      email: z.string().email().describe('Avatar ID'),
    })
    .describe('Query string for filtering or expanding data'),
  params: z
    .object({
      companyId: z.string().optional().describe('Company ID'),
      id: z.string().optional().describe('Avatar ID'),
    })
    .describe('Query string for filtering or expanding data'),
  querystring: z
    .object({
      include: z.string().optional().describe('Fields to include in the response'),
    })
    .describe('Query string for filtering or expanding data'),
})
