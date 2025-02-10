import { Route } from '_INFCommon/route'
import { makeRouteGroup } from '_TEST/utils/factories/infra/common/make-route-group'
import { mockController } from '_TEST/utils/factories/infra/mock/mock-controller'
import z from 'zod'

describe('Infra', () => {
  describe('Common', () => {
    describe('Route', () => {
      describe('Create Route', () => {
        it('should be able create GET', async () => {
          const getRoute = Route.get({
            summary: 'summary',
            description: 'description',
            controller: mockController,
            routeGroup: makeRouteGroup({ group: 'base router' }),
            groups: ['group'],
            operationId: 'operationId',
            path: '/route-path',
            headers: z.object({}),
            params: z.object({}),
            querystring: z.object({
              search: z.string().optional(),
            }),
          })

          expect(getRoute.name).toEqual('bound route')
          expect(getRoute).toBeTruthy()
        })
        it('should be able create POST', async () => {
          const getRoute = Route.post({
            summary: 'summary',
            description: 'description',
            controller: mockController,
            routeGroup: makeRouteGroup({ group: 'base router' }),
            groups: ['group'],
            operationId: 'operationId',
            path: '/route-path',
            body: z.object({}),
            headers: z.object({}),
            params: z.object({}),
            querystring: z.object({}),
          })

          expect(getRoute.name).toEqual('bound route')
          expect(getRoute).toBeTruthy()
        })
        it('should be able create PUT', async () => {
          const getRoute = Route.put({
            summary: 'summary',
            description: 'description',
            controller: mockController,
            routeGroup: makeRouteGroup({ group: 'base router' }),
            groups: ['group'],
            operationId: 'operationId',
            path: '/route-path',
            body: z.object({}),
            headers: z.object({}),
            params: z.object({}),
            querystring: z.object({}),
          })

          expect(getRoute.name).toEqual('bound route')
          expect(getRoute).toBeTruthy()
        })
        it('should be able create PATCH', async () => {
          const getRoute = Route.patch({
            summary: 'summary',
            description: 'description',
            controller: mockController,
            routeGroup: makeRouteGroup({ group: 'base router' }),
            groups: ['group'],
            operationId: 'operationId',
            path: '/route-path',
            body: z.object({}),
            headers: z.object({}),
            params: z.object({}),
            querystring: z.object({}),
          })

          expect(getRoute.name).toEqual('bound route')
          expect(getRoute).toBeTruthy()
        })
        it('should be able create DELETE', async () => {
          const getRoute = Route.delete({
            summary: 'summary',
            description: 'description',
            controller: mockController,
            routeGroup: makeRouteGroup({ group: 'base router' }),
            groups: ['group'],
            operationId: 'operationId',
            path: '/route-path',
            body: z.object({}),
            headers: z.object({}),
            params: z.object({}),
            querystring: z.object({}),
          })

          expect(getRoute.name).toEqual('bound route')
          expect(getRoute).toBeTruthy()
        })
      })
    })
  })
})
