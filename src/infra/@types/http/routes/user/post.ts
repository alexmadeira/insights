import { ZEHttpResponseCategory } from '@CORTypes/enums/http'
import { TMethodResponse } from '@CORTypes/http/route/methods'
import z from 'zod'

export const userBody = z
  .object({
    name: z.string().describe('nome do cliente '),
    email: z.string().email().describe('email do cliente'),
    password: z.string().min(6).describe('senha com no minimo 6 caracteres'),
  })
  .describe('cadastra um cliente ')

export const userParams = z.object({
  company: z.string(),
})

export const userResponse: TMethodResponse = {
  created: z
    .object({
      name: z.string().describe('nome do cliente '),
      email: z.string().email().describe('email do cliente'),
      password: z.string().min(6).describe('senha com no minimo 6 caracteres'),
    })
    .describe('cadastra um cliente '),

  bad_request: z
    .object({
      error: z.string(),
      message: ZEHttpResponseCategory.describe('mensagem de erro'),
    })
    .describe('parametros invalidos'),
}
