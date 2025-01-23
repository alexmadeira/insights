import type { Controller } from '_INFCommon/controller'
import type { Optional } from '@CORTypes/optional'
import type {
  IRoute,
  TRouteBuildRouteProps,
  TRouteDeleteProps,
  TRouteGetProps,
  TRoutePatchProps,
  TRoutePostProps,
  TRoutePutProps,
} from '@INFTypes/common/routes'
import type { TFastifyInstance } from '@INFTypes/http/config/fastify'
import type { RouteOptions } from 'fastify'

import { ZRouteProps } from '@INFTypes/common/routes'

import { MethodDelete, MethodGet, MethodPatch, MethodPost, MethodPut } from './methods'

export class Route implements IRoute {
  private readonly base: string
  private readonly routes: Record<string, RouteOptions> = {}

  constructor(base?: string) {
    this.base = ZRouteProps.parse(base)
  }

  private buildRoute(...[props, handler]: TRouteBuildRouteProps) {
    this.routes[`${props.type}::${props.path}`] = {
      handler,
      url: props.path,
      method: props.type,
      schema: props.schema,
    }
  }

  public get(methodProps: Optional<TRouteGetProps, 'path'>, controller: Controller) {
    this.buildRoute(MethodGet.create({ ...methodProps, pathPrefix: this.base }), controller.handle)
    return this
  }

  public post(methodProps: Optional<TRoutePostProps, 'path'>, controller: Controller) {
    this.buildRoute(MethodPost.create({ ...methodProps, pathPrefix: this.base }), controller.handle)
    return this
  }

  public patch(methodProps: Optional<TRoutePatchProps, 'path'>, controller: Controller) {
    this.buildRoute(MethodPatch.create({ ...methodProps, pathPrefix: this.base }), controller.handle)
    return this
  }

  public put(methodProps: Optional<TRoutePutProps, 'path'>, controller: Controller) {
    this.buildRoute(MethodPut.create({ ...methodProps, pathPrefix: this.base }), controller.handle)
    return this
  }

  public delete(methodProps: Optional<TRouteDeleteProps, 'path'>, controller: Controller) {
    this.buildRoute(MethodDelete.create({ ...methodProps, pathPrefix: this.base }), controller.handle)
    return this
  }

  public register(fastify: TFastifyInstance) {
    Object.values(this.routes).forEach((route) => {
      fastify.route(route)
    })
  }
}
