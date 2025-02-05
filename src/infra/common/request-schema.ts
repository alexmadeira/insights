import type { RequestSchemaProps, TRequestSchemaReturn } from '@INFTypes/common/request-schema'
import type { FastifyRequest } from 'fastify'
import type { ZodTypeAny } from 'zod'

export function RequestSchema<
  TBody extends ZodTypeAny | undefined = undefined,
  TParams extends ZodTypeAny | undefined = undefined,
  THeaders extends ZodTypeAny | undefined = undefined,
  TQuerystring extends ZodTypeAny | undefined = undefined,
>(
  props: RequestSchemaProps<TBody, TParams, THeaders, TQuerystring>,
): TRequestSchemaReturn<TBody, TParams, THeaders, TQuerystring> {
  const bodyZodSchema = props.body as NonNullable<TBody>
  const paramsZodSchema = props.params as NonNullable<TParams>
  const headersZodSchema = props.headers as NonNullable<THeaders>
  const querystringZodSchema = props.querystring as NonNullable<TQuerystring>

  const getRequestBody = (request: FastifyRequest) => {
    return bodyZodSchema.parse(request.body)
  }
  const getRequestParams = (request: FastifyRequest) => {
    return paramsZodSchema.parse(request.params)
  }
  const getRequestHeaders = (request: FastifyRequest) => {
    return headersZodSchema.parse(request.headers)
  }
  const getRequestQuerystring = (request: FastifyRequest) => {
    return querystringZodSchema.parse(request.query)
  }

  return {
    ...(props.body ? { bodyZodSchema, getRequestBody } : {}),
    ...(props.params ? { paramsZodSchema, getRequestParams } : {}),
    ...(props.headers ? { headersZodSchema, getRequestHeaders } : {}),
    ...(props.querystring ? { querystringZodSchema, getRequestQuerystring } : {}),
    routeSchema: {
      body: bodyZodSchema,
      params: paramsZodSchema,
      headers: headersZodSchema,
      querystring: querystringZodSchema,
    },
  } as TRequestSchemaReturn<TBody, TParams, THeaders, TQuerystring>
}
