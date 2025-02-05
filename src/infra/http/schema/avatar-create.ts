import { RequestSchema } from '_INFCommon/request-schema'
import z from 'zod'

export const avatarCreateSchema = RequestSchema({
  // headers: z.object({
  //   authorization: z.string().describe('Bearer token'),
  // }),
  // body: z
  //   .object({
  //     name: z.string().describe('Avatar Name'),
  //     url: z.string().url().optional().describe('Avatar image url'),
  //   })
  //   .describe('Create a new unlinked avatar'),
  params: z
    .object({
      id: z.string().uuid().describe('Avatar ID'),
      data: z.string().describe('Avatar ID'),
    })
    .describe('Route params for avatar operations'),
  querystring: z
    .object({
      include: z.string().optional().describe('Fields to include in the response'),
    })
    .describe('Query string for filtering or expanding data'),
})
