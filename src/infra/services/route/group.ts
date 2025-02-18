import type { IRouteGroup, TRouteGroupBasePath, TRouteGroupName } from '@INFTypes/services/route/group'

import { AutoBind } from '_COR/auto-bind'
import { TFastifyInstance } from '@INFTypes/http/config/fastify'
import _ from 'lodash'

import { Route } from './route'

type TRoute = (fastify: TFastifyInstance) => void
type TRouteProps = {
  name: TRouteGroupName
  basePath: TRouteGroupBasePath
}

export class RouteGroup extends AutoBind<TRouteProps> implements IRouteGroup {
  private readonly _routes: Set<TRoute> = new Set<TRoute>()

  static create(...[group = '', path = '']: [RouteGroup | string | undefined] | [string, string]) {
    if (group instanceof RouteGroup) return group

    const basePath = this.formatPath(path || group)
    return new RouteGroup({
      name: group,
      basePath,
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

  public addRoute(route: Route | Route[]) {
    const routes = _.castArray(route)

    routes.forEach((route) => {
      route.path = this.path(route.path, route.paramList)
      route.tags = _.chain(this.name).concat(route.tags).uniq().value()

      this._routes.add(route.register)
    })
  }

  public register(fastify: TFastifyInstance) {
    this._routes.forEach((route) => fastify.register(route))
  }
}
