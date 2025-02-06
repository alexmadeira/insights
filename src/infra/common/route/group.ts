import type { IRouteGroup, TRouteGroupBasePath, TRouteGroupName } from '@INFTypes/common/route/group'

import _ from 'lodash'

export class RouteGroup implements IRouteGroup {
  protected constructor(
    private readonly _name: TRouteGroupName,
    private readonly _basePath: TRouteGroupBasePath,
  ) {}

  static create(...[group = '', path = '']: [RouteGroup] | [string, string] | [string]) {
    if (group instanceof RouteGroup) return group

    const basePath = this.formatPath(path || group)
    return new RouteGroup(group, basePath)
  }

  private static formatPath<T extends unknown[]>(...args: T) {
    return '/' + _.chain(args).map(_.kebabCase).join('/').replace(/\/$/g, '').replace(/\/\/+/g, '/').value()
  }

  public get basePath() {
    return this._basePath
  }

  public get name() {
    return this._name
  }

  public path(suffix: string = '', paramList: string[] = []) {
    const params = paramList.map((param) => `:${param}`).join('/')

    return _.compact([this.basePath, suffix.replace(/\/$/g, ''), params])
      .join('/')
      .replace(/\/\/+/g, '/')
  }
}
