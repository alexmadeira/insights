import z, { ZodSchema } from 'zod'

export const ZRouteSchemaHeaders = z.instanceof(ZodSchema)
export const ZRouteSchemaBody = z.instanceof(ZodSchema)
export const ZRouteSchemaParams = z.instanceof(ZodSchema)
export const ZRouteSchemaQueryString = z.instanceof(ZodSchema)

export const ZRouteSchemaSchema = z.object({
  tags: z.array(z.string()),
  summary: z.string(),
  description: z.string(),
  body: ZRouteSchemaBody.optional(),
  params: ZRouteSchemaParams.optional(),
  headers: ZRouteSchemaHeaders.optional(),
  querystring: ZRouteSchemaQueryString.optional(),
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
})

export const ZRouteSchema = z.object({
  path: z.string(),
  schema: ZRouteSchemaSchema,
})

//
//
//

export type TRouteSchemaSchema = z.infer<typeof ZRouteSchemaSchema>

export type TRouteSchemaProps = z.infer<typeof ZRouteSchemaProps>
export interface IRouteSchema extends z.infer<typeof ZRouteSchema> {}
