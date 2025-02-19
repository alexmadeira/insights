import { RouteGroup } from '_INF/services/route'
import { mockPipe } from '_TEST/utils/factories/infra/mock/mock-pipe'
import { makeRoute } from '_TEST/utils/factories/infra/services/make-route'

describe('Infra', () => {
  describe('Common', () => {
    describe('Route', () => {
      describe('Create route group', () => {
        it('should be able create new', async () => {
          const routeGroup = RouteGroup.create('route group', '/route-path')

          expect(routeGroup.name).toEqual('route group')
          expect(routeGroup.basePath).toEqual('/route-path')
        })
        it('should be able create without basePath', async () => {
          const routeGroup = RouteGroup.create('route group')

          expect(routeGroup.name).toEqual('route group')
          expect(routeGroup.basePath).toEqual('/route-group')
        })
        it('should be able add route to group', async () => {
          const routeGroup = RouteGroup.create('group')
          const route = makeRoute()

          routeGroup.addRoute(route)
          expect(routeGroup.routes).toHaveLength(1)
        })
        it('should be able add middleware to group', async () => {
          const routeGroup = RouteGroup.create('group')

          routeGroup.addMiddleware(mockPipe)

          expect(routeGroup.pipes).toHaveLength(1)
        })
        it('should be able get register', async () => {
          const routeGroup = RouteGroup.create('group')

          expect(routeGroup.register).toBeTruthy()
          expect(routeGroup.register).toBeTypeOf('function')
        })
      })
    })
  })
})
