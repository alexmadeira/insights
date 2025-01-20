import type {
  IRoute,
  TRouteBuildRouteProps,
  TRouteDeleteProps,
  TRouteGetProps,
  TRoutePatchProps,
  TRoutePostProps,
  TRoutePutProps,
} from '@CORTypes/http/route'
import type { Optional } from '@CORTypes/optional'
import type { RouteHandler, RouteOptions } from 'fastify'

import { ZRouteProps } from '@CORTypes/http/route'
import { FastifyInstance } from 'fastify/types/instance'

import { MethodDelete } from './methods/method-delete'
import { MethodGet } from './methods/method-get'
import { MethodPatch } from './methods/method-patch'
import { MethodPost } from './methods/method-post'
import { MethodPut } from './methods/method-put'

export class Route implements IRoute {
  private readonly base: string
  private readonly routes: Record<string, RouteOptions> = {}

  constructor(base?: string) {
    this.base = ZRouteProps.parse(base)
  }

  private buildRoute({ data, handler }: TRouteBuildRouteProps) {
    this.routes[`${data.type}::${data.path}`] = {
      handler,
      method: data.type,
      schema: data.schema,
      url: data.path,
    }
  }

  public get(methodProps: Optional<TRouteGetProps, 'path'>, handler: RouteHandler) {
    this.buildRoute({
      handler,
      data: MethodGet.create({ ...methodProps, pathPrefix: this.base }),
    })
    return this
  }

  public post(methodProps: Optional<TRoutePostProps, 'path'>, handler: RouteHandler) {
    this.buildRoute({
      handler,
      data: MethodPost.create({ ...methodProps, pathPrefix: this.base }),
    })
    return this
  }

  public patch(methodProps: Optional<TRoutePatchProps, 'path'>, handler: RouteHandler) {
    this.buildRoute({
      handler,
      data: MethodPatch.create({ ...methodProps, pathPrefix: this.base }),
    })
    return this
  }

  public put(methodProps: Optional<TRoutePutProps, 'path'>, handler: RouteHandler) {
    this.buildRoute({
      handler,
      data: MethodPut.create({ ...methodProps, pathPrefix: this.base }),
    })
    return this
  }

  public delete(methodProps: Optional<TRouteDeleteProps, 'path'>, handler: RouteHandler) {
    this.buildRoute({
      handler,
      data: MethodDelete.create({ ...methodProps, pathPrefix: this.base }),
    })
    return this
  }

  public register(fastify: FastifyInstance) {
    Object.values(this.routes).forEach((route) => {
      fastify.route(route)
    })
  }
}
