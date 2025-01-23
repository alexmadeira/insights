import { ZEHttpResponseCategory } from '@CORTypes/enums/http'
import { TMethodResponse } from '@INFTypes/common/routes/methods'
import z from 'zod'

export const response: TMethodResponse = {
  created: z
    .object({
      id: z.string().describe('Avatar ID'),
      url: z.string().nullish().describe('Avatar image url'),
      name: z.string().describe('Avatar full name'),
      acronym: z.string().min(6).describe('Avatar name initials'),
    })
    .describe('Avatar created'),
  unauthorized: z
    .object({
      error: z.string(),
      message: ZEHttpResponseCategory.describe('mensagem de erro'),
    })
    .describe('parametros invalidos'),
  bad_request: z
    .object({
      error: z.string(),
      message: ZEHttpResponseCategory.describe('mensagem de erro'),
    })
    .describe('parametros invalidos'),
}

export const body = z
  .object({
    name: z.string().describe('Avatar Name'),
    url: z.string({ description: 'http://temp.com.br' }).url().optional().describe('Avatar image url'),
  })
  .describe('Create a new unlinked avatar')
