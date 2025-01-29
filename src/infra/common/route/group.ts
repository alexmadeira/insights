import type { IRouteGroup, TRouteGroupBasePath, TRouteGroupName } from '@INFTypes/common/route/group'

import _ from 'lodash'

export class RouteGroup implements IRouteGroup {
  protected constructor(
    private readonly _name: TRouteGroupName,
    private readonly _basePath: TRouteGroupBasePath,
  ) {}

  static create(group?: string | RouteGroup, basePath: string = '/') {
    if (group instanceof RouteGroup) return group

    return new RouteGroup(
      _.chain(group ?? [])
        .concat([])
        .compact()
        .value(),
      _.compact([basePath, group]).join('/'),
    )
  }

  public get basePath() {
    return this._basePath
  }

  public get name() {
    return this._name
  }

  public path(suffix: string) {
    return _.compact([this.basePath, suffix.replace(/\/$/g, '')])
      .join('/')
      .replace(/\/\/+/g, '/')
  }
}
