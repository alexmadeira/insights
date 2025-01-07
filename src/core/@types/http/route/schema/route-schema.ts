import { ZEHttpResponseCode } from '@CORTypes/enums/http'
import z, { ZodSchema } from 'zod'

export const ZRouteSchemaHeaders = z.instanceof(ZodSchema)
export const ZRouteSchemaBody = z.instanceof(ZodSchema)
export const ZRouteSchemaParams = z.instanceof(ZodSchema)
export const ZRouteSchemaQueryString = z.instanceof(ZodSchema)
export const ZRouteResponseStatus = z.record(z.string(), z.instanceof(ZodSchema))

export const ZRouteResponseSchema = z.record(ZEHttpResponseCode, z.instanceof(ZodSchema))

export const ZRouteSchemaSchema = z.object({
  tags: z.array(z.string()),
  summary: z.string(),
  description: z.string(),
  body: ZRouteSchemaBody.optional(),
  params: ZRouteSchemaParams.optional(),
  headers: ZRouteSchemaHeaders.optional(),
  querystring: ZRouteSchemaQueryString.optional(),
  response: ZRouteResponseStatus.optional(),
})

export const ZRouteSchemaProps = z.object({
  path: z.string(),
  tags: z.array(z.string()),
  summary: z.string(),
  description: z.string(),
  body: ZRouteSchemaBody.optional(),
  params: ZRouteSchemaParams.optional(),
  headers: ZRouteSchemaHeaders.optional(),
  querystring: ZRouteSchemaQueryString.optional(),
  response: ZRouteResponseSchema.optional(),
})

export const ZRouteSchema = z.object({
  path: z.string(),
  schema: ZRouteSchemaSchema,
})

//
//
//

export type TRouteSchemaSchema = z.infer<typeof ZRouteSchemaSchema>
export type TRouteResponseStatus = z.infer<typeof ZRouteResponseStatus>
export type TRouteResponseSchema = z.infer<typeof ZRouteResponseSchema>

export type TRouteSchemaProps = z.infer<typeof ZRouteSchemaProps>
export interface IRouteSchema extends z.infer<typeof ZRouteSchema> {}
