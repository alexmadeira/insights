import type { FastifyRequest } from 'fastify'
import type { z, ZodTypeAny } from 'zod'

export type RequestSchemaProps<
  TBody extends ZodTypeAny | undefined,
  TParams extends ZodTypeAny | undefined,
  THeaders extends ZodTypeAny | undefined,
  TQuerystring extends ZodTypeAny | undefined,
> = {
  body?: TBody
  params?: TParams
  headers?: THeaders
  querystring?: TQuerystring
}

export type TRequestSchemaBody<TBody extends ZodTypeAny> = {
  getRequestBody: (request: FastifyRequest) => z.infer<TBody>
  bodyZodSchema: TBody
}
export type TRequestSchemaParams<TParams extends ZodTypeAny> = {
  getRequestParams: (request: FastifyRequest) => z.infer<TParams>
  paramsZodSchema: TParams
}

export type TRequestSchemaHeaders<THeaders extends ZodTypeAny> = {
  getRequestHeaders: (request: FastifyRequest) => z.infer<THeaders>
  headersZodSchema: THeaders
}
export type TRequestSchemaQuerystring<TQuerystring extends ZodTypeAny> = {
  getRequestQuerystring: (request: FastifyRequest) => z.infer<TQuerystring>
  querystringZodSchema: TQuerystring
}

export type TRequestSchemaRoute<
  TBody extends ZodTypeAny | undefined = undefined,
  TParams extends ZodTypeAny | undefined = undefined,
  THeaders extends ZodTypeAny | undefined = undefined,
  TQuerystring extends ZodTypeAny | undefined = undefined,
> = (TBody extends ZodTypeAny ? { body: TBody } : unknown) &
  (TParams extends ZodTypeAny ? { params: TParams } : unknown) &
  (THeaders extends ZodTypeAny ? { headers: THeaders } : unknown) &
  (TQuerystring extends ZodTypeAny ? { querystring: TQuerystring } : unknown)

export type TRequestSchemaReturn<
  TBody extends ZodTypeAny | undefined = undefined,
  TParams extends ZodTypeAny | undefined = undefined,
  THeaders extends ZodTypeAny | undefined = undefined,
  TQuerystring extends ZodTypeAny | undefined = undefined,
> = (TBody extends ZodTypeAny ? TRequestSchemaBody<TBody> : unknown) &
  (TParams extends ZodTypeAny ? TRequestSchemaParams<TParams> : unknown) &
  (THeaders extends ZodTypeAny ? TRequestSchemaHeaders<THeaders> : unknown) &
  (TQuerystring extends ZodTypeAny ? TRequestSchemaQuerystring<TQuerystring> : unknown) & {
    routeSchema: TRequestSchemaRoute<TBody, TParams, THeaders, TQuerystring>
  }
