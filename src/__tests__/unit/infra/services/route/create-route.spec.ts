import { Route } from '_INF/services/route'
import { mockController } from '_TEST/utils/factories/infra/mock/mock-controller'
import { mockPipe } from '_TEST/utils/factories/infra/mock/mock-pipe'
import z, { ZodSchema } from 'zod'

describe('Infra', () => {
  describe('Common', () => {
    describe('Route', () => {
      describe('Create Route', () => {
        it('should be able create', async () => {
          const props = {
            summary: 'summary',
            description: 'description',
            controller: mockController,
            body: z.object({}),
          }

          const routeGet = Route.get(props)
          const routePost = Route.post(props)
          const routePut = Route.put(props)
          const routePatch = Route.patch(props)
          const routeDelete = Route.delete(props)

          expect(routeGet.register).toBeTruthy()
          expect(routePost.register).toBeTruthy()
          expect(routePut.register).toBeTruthy()
          expect(routePatch.register).toBeTruthy()
          expect(routeDelete.register).toBeTruthy()
        })
        it('should be able create with pipes', async () => {
          const props = {
            summary: 'summary',
            description: 'description',
            controller: mockController,
            pipes: [mockPipe],
            body: z.object({}),
          }

          const routeGet = Route.get(props)
          const routePost = Route.post(props)
          const routePut = Route.put(props)
          const routePatch = Route.patch(props)
          const routeDelete = Route.delete(props)

          expect(routeGet.pipes).toHaveLength(1)
          expect(routePost.pipes).toHaveLength(1)
          expect(routePut.pipes).toHaveLength(1)
          expect(routePatch.pipes).toHaveLength(1)
          expect(routeDelete.pipes).toHaveLength(1)
        })
        it('should be able get register', async () => {
          const route = Route.get({
            tags: ['tag'],
            summary: 'summary',
            description: 'description',
            operationId: 'operationId',
            controller: mockController,
          })

          expect(route.register).toBeTruthy()
          expect(route.register).toBeTypeOf('function')
        })
        it('should be able get schema', async () => {
          const route = Route.delete({
            tags: ['tag'],
            summary: 'summary',
            description: 'description',
            operationId: 'operationId',
            controller: mockController,
            body: z.object({}),
            headers: z.object({}),
            params: z.object({}),
            querystring: z.object({}),
          })

          expect(route.schema.tags).toEqual(['tag'])
          expect(route.schema.summary).toEqual('summary')
          expect(route.schema.description).toEqual('description')
          expect(route.schema.operationId).toEqual('operationId')
          expect(route.schema.body).instanceOf(ZodSchema)
          expect(route.schema.headers).instanceOf(ZodSchema)
          expect(route.schema.params).instanceOf(ZodSchema)
          expect(route.schema.querystring).instanceOf(ZodSchema)
        })
        it('should be able create without path', async () => {
          const route = Route.get({
            summary: 'summary',
            description: 'description',
            controller: mockController,
          })

          expect(route.path).toEqual('/')
        })
        it('should be able create without tags', async () => {
          const route = Route.get({
            summary: 'summary',
            description: 'description',
            controller: mockController,
          })

          expect(route.tags).toEqual([])
        })
        it('should be able create without operationId', async () => {
          const route = Route.get({
            summary: 'summary',
            tags: ['tag'],
            description: 'description',
            controller: mockController,
          })

          expect(route.operationId).toEqual('getTag')
        })
        it('should be able create without body', async () => {
          const route = Route.get({
            summary: 'summary',
            description: 'description',
            controller: mockController,
          })

          expect(route.body).toBeUndefined()
        })
        it('should be able create without params', async () => {
          const route = Route.get({
            summary: 'summary',
            description: 'description',
            controller: mockController,
          })

          expect(route.params).toBeUndefined()
        })
        it('should be able create without headers', async () => {
          const route = Route.get({
            summary: 'summary',
            description: 'description',
            controller: mockController,
          })

          expect(route.headers).toBeUndefined()
        })
        it('should be able create without querystring', async () => {
          const route = Route.get({
            summary: 'summary',
            description: 'description',
            controller: mockController,
          })

          expect(route.querystring).toBeUndefined()
        })
      })
    })
  })
})
