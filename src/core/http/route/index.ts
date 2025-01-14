import type { TEHttpMethods } from '@CORTypes/enums/http'
import type { TFastifyInstance } from '@INFTypes/http/config/fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { RouteMethods } from './routes'

import { fastifyPlugin } from 'fastify-plugin'

export class Route {
  private readonly _basePath: string
  private readonly _methodPipes: RouteMethods

  constructor(methodPipes: RouteMethods, path: string = '/') {
    this._basePath = path.startsWith('/') ? path : `/${path}`
    this._methodPipes = methodPipes
  }

  static create(methodPipes: RouteMethods, path?: string) {
    return new Route(methodPipes, path).plugin
  }

  private url(path: string) {
    return `${this._basePath}${path}`.replace(/\/\/+/g, '/').replace(/\/$/g, '')
  }

  private makeRoute(fastify: TFastifyInstance, method: TEHttpMethods) {
    const routeOptions = this._methodPipes[method]

    if (!routeOptions) return

    fastify.withTypeProvider<ZodTypeProvider>().route({
      method,
      url: this.url(routeOptions.path),
      schema: routeOptions.schema,
      handler: async (_req, res) => {
        return res.send('Hello World')
      },
    })
  }

  public get plugin() {
    return fastifyPlugin((fastify) => {
      fastify.register((fastify) => this.makeRoute(fastify, 'get'))
      fastify.register((fastify) => this.makeRoute(fastify, 'post'))
      fastify.register((fastify) => this.makeRoute(fastify, 'put'))
      fastify.register((fastify) => this.makeRoute(fastify, 'patch'))
      fastify.register((fastify) => this.makeRoute(fastify, 'delete'))
    })
  }
}
