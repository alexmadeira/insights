import { Route } from '_INFCommon/route'
import { makeRouteGroup } from '_TEST/utils/factories/infra/common/make-route-group'
import { mockController } from '_TEST/utils/factories/infra/mock/mock-controller'
import z, { ZodSchema } from 'zod'

describe('Infra', () => {
  describe('Common', () => {
    describe('Route', () => {
      describe('Create Route', () => {
        describe('GET', () => {
          it('should be able create', async () => {
            const route = Route.get({
              summary: 'summary',
              description: 'description',
              controller: mockController,
              routeGroup: makeRouteGroup({ group: 'base router', path: 'base-path' }),
              groups: ['group'],
              operationId: 'operationId',
              path: '/route-path',
              headers: z.object({}),
              params: z.object({}),
              querystring: z.object({}),
            })

            expect(route.path).toEqual('/base-path/route-path')
            expect(route.tags).toEqual(['group', 'base router'])
            expect(route.method).toEqual('get')
            expect(route.summary).toEqual('summary')
            expect(route.description).toEqual('description')
            expect(route.operationId).toEqual('operationId')

            expect(route.controller).toEqual(mockController.handler)

            expect(route.body).toBeUndefined()

            expect(route.params).instanceOf(ZodSchema)
            expect(route.headers).instanceOf(ZodSchema)
            expect(route.querystring).instanceOf(ZodSchema)
          })
          it('should be able get schema', async () => {
            const route = Route.get({
              groups: ['group'],
              summary: 'summary',
              description: 'description',
              operationId: 'operationId',
              controller: mockController,
              headers: z.object({}),
              params: z.object({}),
              querystring: z.object({}),
            })

            expect(route.schema.tags).toEqual(['group'])
            expect(route.schema.summary).toEqual('summary')
            expect(route.schema.description).toEqual('description')
            expect(route.schema.operationId).toEqual('operationId')

            expect(route.schema.body).toBeUndefined()

            expect(route.schema.headers).instanceOf(ZodSchema)
            expect(route.schema.params).instanceOf(ZodSchema)
            expect(route.schema.querystring).instanceOf(ZodSchema)
          })
        })
      })
    })
  })
})
