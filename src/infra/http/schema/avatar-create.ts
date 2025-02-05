import { RequestSchema } from '_INFCommon/request-schema'
import z from 'zod'

export const avatarCreateSchema = RequestSchema({
  querystring: z
    .object({
      include: z.string().optional().describe('Fields to include in the response'),
    })
    .describe('Query string for filtering or expanding data'),
})
