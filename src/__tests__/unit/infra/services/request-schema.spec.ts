import { RequestSchema } from '_INFServices/request-schema'
import z, { ZodSchema } from 'zod'

describe('Infra', () => {
  describe('Common', () => {
    describe('Request Schema', () => {
      it('should be able create', async () => {
        const schema = RequestSchema({
          body: z.object({}),
          params: z.object({}),
          headers: z.object({}),
          querystring: z.object({}),
        })

        expect(schema.bodyZodSchema).instanceOf(ZodSchema)
        expect(schema.paramsZodSchema).instanceOf(ZodSchema)
        expect(schema.headersZodSchema).instanceOf(ZodSchema)
        expect(schema.querystringZodSchema).instanceOf(ZodSchema)

        expect(schema.getRequestBody).toBeTruthy()
        expect(schema.getRequestBody).toBeTypeOf('function')

        expect(schema.getRequestParams).toBeTruthy()
        expect(schema.getRequestParams).toBeTypeOf('function')

        expect(schema.getRequestHeaders).toBeTruthy()
        expect(schema.getRequestHeaders).toBeTypeOf('function')

        expect(schema.getRequestQuerystring).toBeTruthy()
        expect(schema.getRequestQuerystring).toBeTypeOf('function')
      })
      it('should be able without body', async () => {
        const schema = RequestSchema({
          params: z.object({}),
          headers: z.object({}),
          querystring: z.object({}),
        })

        expect(schema.paramsZodSchema).instanceOf(ZodSchema)
        expect(schema.headersZodSchema).instanceOf(ZodSchema)
        expect(schema.querystringZodSchema).instanceOf(ZodSchema)

        expect(schema).not.toHaveProperty('getRequestBody')

        expect(schema.getRequestParams).toBeTruthy()
        expect(schema.getRequestParams).toBeTypeOf('function')

        expect(schema.getRequestHeaders).toBeTruthy()
        expect(schema.getRequestHeaders).toBeTypeOf('function')

        expect(schema.getRequestQuerystring).toBeTruthy()
        expect(schema.getRequestQuerystring).toBeTypeOf('function')
      })
      it('should be able without params', async () => {
        const schema = RequestSchema({
          body: z.object({}),
          headers: z.object({}),
          querystring: z.object({}),
        })

        expect(schema.bodyZodSchema).instanceOf(ZodSchema)
        expect(schema.headersZodSchema).instanceOf(ZodSchema)
        expect(schema.querystringZodSchema).instanceOf(ZodSchema)

        expect(schema.getRequestBody).toBeTruthy()
        expect(schema.getRequestBody).toBeTypeOf('function')

        expect(schema).not.toHaveProperty('getRequestParams')

        expect(schema.getRequestHeaders).toBeTruthy()
        expect(schema.getRequestHeaders).toBeTypeOf('function')

        expect(schema.getRequestQuerystring).toBeTruthy()
        expect(schema.getRequestQuerystring).toBeTypeOf('function')
      })
      it('should be able without headers', async () => {
        const schema = RequestSchema({
          body: z.object({}),
          params: z.object({}),
          querystring: z.object({}),
        })

        expect(schema.bodyZodSchema).instanceOf(ZodSchema)
        expect(schema.paramsZodSchema).instanceOf(ZodSchema)
        expect(schema.querystringZodSchema).instanceOf(ZodSchema)

        expect(schema.getRequestBody).toBeTruthy()
        expect(schema.getRequestBody).toBeTypeOf('function')

        expect(schema.getRequestParams).toBeTruthy()
        expect(schema.getRequestParams).toBeTypeOf('function')

        expect(schema).not.toHaveProperty('getRequestHeaders')

        expect(schema.getRequestQuerystring).toBeTruthy()
        expect(schema.getRequestQuerystring).toBeTypeOf('function')
      })
      it('should be able without querystring', async () => {
        const schema = RequestSchema({
          body: z.object({}),
          params: z.object({}),
          headers: z.object({}),
        })

        expect(schema.bodyZodSchema).instanceOf(ZodSchema)
        expect(schema.paramsZodSchema).instanceOf(ZodSchema)
        expect(schema.headersZodSchema).instanceOf(ZodSchema)

        expect(schema.getRequestBody).toBeTruthy()
        expect(schema.getRequestBody).toBeTypeOf('function')

        expect(schema.getRequestParams).toBeTruthy()
        expect(schema.getRequestParams).toBeTypeOf('function')

        expect(schema.getRequestHeaders).toBeTruthy()
        expect(schema.getRequestHeaders).toBeTypeOf('function')

        expect(schema).not.toHaveProperty('getRequestQuerystring')
      })
    })
  })
})
