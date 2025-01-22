import type { HTTPMethods, RouteOptions } from 'fastify'

import { ZEHttpResponseCode } from '@CORTypes/enums/http'
import z, { ZodSchema } from 'zod'

export const ZMethodHeaders = z.instanceof(ZodSchema)
export const ZMethodBody = z.instanceof(ZodSchema)
export const ZMethodParams = z.instanceof(ZodSchema)
export const ZMethodQueryString = z.instanceof(ZodSchema)
export const ZMethodResponseStatus = z.record(z.string(), z.instanceof(ZodSchema))

export const ZMethodResponse = z.record(ZEHttpResponseCode, z.instanceof(ZodSchema))

export const ZMethodSchema = z.object({
  tags: z.array(z.string()),
  summary: z.string(),
  description: z.string(),
  body: ZMethodBody.optional(),
  params: ZMethodParams.optional(),
  headers: ZMethodHeaders.optional(),
  querystring: ZMethodQueryString.optional(),
  response: ZMethodResponseStatus.optional(),
})

export const ZMethodProps = z.object({
  type: z.custom<HTTPMethods>(),
  path: z.string(),
  pathPrefix: z.string(),
  tags: z.array(z.string()),
  summary: z.string(),
  description: z.string(),
  body: ZMethodBody.optional(),
  params: ZMethodParams.optional(),
  headers: ZMethodHeaders.optional(),
  querystring: ZMethodQueryString.optional(),
  response: ZMethodResponse.optional(),
})

export const ZMethod = z.object({
  path: z.string(),
  type: z.custom<RouteOptions['method']>(),
  schema: ZMethodSchema,
})

//
//
//

export type TMethodHeaders = z.infer<typeof ZMethodHeaders>
export type TMethodBody = z.infer<typeof ZMethodBody>
export type TMethodParams = z.infer<typeof ZMethodParams>
export type TMethodQueryString = z.infer<typeof ZMethodQueryString>
export type TMethodResponseStatus = z.infer<typeof ZMethodResponseStatus>
export type TMethodResponse = z.infer<typeof ZMethodResponse>
export type TMethodSchema = z.infer<typeof ZMethodSchema>

export type TMethodProps = z.infer<typeof ZMethodProps>
export interface IMethod extends z.infer<typeof ZMethod> {}
