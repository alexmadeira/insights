import { RouteGroup } from '_INFCommon/route'

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

        it('should be able create path', async () => {
          const routeGroup = RouteGroup.create('route group')
          const path = routeGroup.path('path')

          expect(path).toEqual('/route-group/path')
        })

        it('should be able create with params', async () => {
          const routeGroup = RouteGroup.create('route group')
          const path = routeGroup.path('path', ['param1', 'param2'])

          expect(path).toEqual('/route-group/path/:param1/:param2')
        })

        it('should be able accept a routeGroup Instance', async () => {
          const firstRouteGroup = RouteGroup.create('first route group')
          const routeGroup = RouteGroup.create(firstRouteGroup)

          expect(routeGroup.name).toEqual('first route group')
          expect(routeGroup.basePath).toEqual('/first-route-group')
        })
      })
    })
  })
})
