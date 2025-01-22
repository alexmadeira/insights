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
import type { RouteOptions } from 'fastify'

import { IController } from '_INFHttp/controller/user/get-user.controller'
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

  private buildRoute(...[props, handler]: TRouteBuildRouteProps) {
    this.routes[`${props.type}::${props.path}`] = {
      handler,
      method: props.type,
      schema: props.schema,
      url: props.path,
    }
  }

  public get(methodProps: Optional<TRouteGetProps, 'path'>, controller: IController) {
    this.buildRoute(MethodGet.create({ ...methodProps, pathPrefix: this.base }), controller.handle)
    return this
  }

  public post(methodProps: Optional<TRoutePostProps, 'path'>, controller: IController) {
    this.buildRoute(MethodPost.create({ ...methodProps, pathPrefix: this.base }), controller.handle)
    return this
  }

  public patch(methodProps: Optional<TRoutePatchProps, 'path'>, controller: IController) {
    this.buildRoute(MethodPatch.create({ ...methodProps, pathPrefix: this.base }), controller.handle)
    return this
  }

  public put(methodProps: Optional<TRoutePutProps, 'path'>, controller: IController) {
    this.buildRoute(MethodPut.create({ ...methodProps, pathPrefix: this.base }), controller.handle)
    return this
  }

  public delete(methodProps: Optional<TRouteDeleteProps, 'path'>, controller: IController) {
    this.buildRoute(MethodDelete.create({ ...methodProps, pathPrefix: this.base }), controller.handle)
    return this
  }

  public register(fastify: FastifyInstance) {
    Object.values(this.routes).forEach((route) => {
      fastify.route(route)
    })
  }
}
