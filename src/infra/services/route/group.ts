import type { TFastifyInstance } from '@INFTypes/http/config/fastify'
import type { IPipe } from '@INFTypes/http/pipe'
import type { IRouteGroup, TRouteGroupProps, TRouteGroupRoute } from '@INFTypes/services/route/group'

import { AutoBind } from '_COR/auto-bind'
import _ from 'lodash'

import { Route } from './route'

export class RouteGroup extends AutoBind<TRouteGroupProps> implements IRouteGroup {
  private readonly _routes: Set<TRouteGroupRoute> = new Set<TRouteGroupRoute>()
  private readonly _pipes: Set<IPipe> = new Set<IPipe>()

  static create(name: string = '', path: string = '') {
    return new RouteGroup({
      name,
      basePath: this.formatPath(path || name),
    })
  }

  private static formatPath<T extends unknown[]>(...args: T) {
    return '/' + _.chain(args).map(_.kebabCase).join('/').replace(/\/$/g, '').replace(/\/\/+/g, '/').value()
  }

  private path(suffix: string = '', paramList: string[] = []) {
    const params = paramList.map((param) => `:${param}`).join('/')

    return _.compact([this.basePath, suffix.replace(/\/$/g, ''), params])
      .join('/')
      .replace(/\/\/+/g, '/')
  }

  public get basePath() {
    return this._props.basePath
  }

  public get name() {
    return this._props.name
  }

  public get routes() {
    return this._routes
  }

  public get pipes() {
    return this._pipes
  }

  public addMiddleware(routePipe: IPipe | IPipe[]) {
    const pipes = _.castArray(routePipe)

    pipes.forEach((pipe) => {
      this._pipes.add(pipe)
    })
  }

  public addRoute(route: Route | Route[]) {
    const routes = _.castArray(route)
    routes.forEach((route) => {
      route.path = this.path(route.path, route.paramList)
      route.tags = _.chain(this.name).concat(route.tags).uniq().value()

      this._routes.add(route.register)
    })
  }

  public register(fastify: TFastifyInstance) {
    this._pipes.forEach((pipe) => fastify.addHook('onRequest', pipe.handler))
    this._routes.forEach((route) => fastify.register(route))
  }
}
