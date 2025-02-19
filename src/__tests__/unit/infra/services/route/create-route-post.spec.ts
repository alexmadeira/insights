import { Route } from '_INF/services/route'
import { mockController } from '_TEST/utils/factories/infra/mock/mock-controller'
import z, { ZodSchema } from 'zod'

describe('Infra', () => {
  describe('Common', () => {
    describe('Route', () => {
      describe('Create Route', () => {
        describe('POST', () => {
          it('should be able create', async () => {
            const route = Route.post({
              summary: 'summary',
              description: 'description',
              controller: mockController,
              tags: ['tag'],
              operationId: 'operationId',
              path: '/route-path',
              body: z.object({}),
              headers: z.object({}),
              params: z.object({}),
              querystring: z.object({}),
            })

            expect(route.path).toEqual('/route-path')
            expect(route.tags).toEqual(['tag'])
            expect(route.method).toEqual('post')
            expect(route.summary).toEqual('summary')
            expect(route.description).toEqual('description')
            expect(route.operationId).toEqual('operationId')

            expect(route.controller).toEqual(mockController.handler)

            expect(route.body).instanceOf(ZodSchema)
            expect(route.headers).instanceOf(ZodSchema)
            expect(route.params).instanceOf(ZodSchema)
            expect(route.querystring).instanceOf(ZodSchema)
          })
        })
      })
    })
  })
})
