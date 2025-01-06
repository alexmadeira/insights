import type { RouteSchemaDelete } from './schema/route-schema-delete'
import type { RouteSchemaGet } from './schema/route-schema-get'
import type { RouteSchemaPatch } from './schema/route-schema-patch'
import type { RouteSchemaPost } from './schema/route-schema-post'
import type { RouteSchemaPut } from './schema/route-schema-put'

export class RouteMethods {
  private _get: RouteSchemaGet | undefined
  private _put: RouteSchemaPut | undefined
  private _post: RouteSchemaPost | undefined
  private _patch: RouteSchemaPatch | undefined
  private _delete: RouteSchemaDelete | undefined

  public set get(routeSchema: RouteSchemaGet | undefined) {
    this._get = routeSchema
  }

  public set put(routeSchema: RouteSchemaPut | undefined) {
    this._put = routeSchema
  }

  public set post(routeSchema: RouteSchemaPost | undefined) {
    this._post = routeSchema
  }

  public set patch(routeSchema: RouteSchemaPatch | undefined) {
    this._patch = routeSchema
  }

  public set delete(routeSchema: RouteSchemaDelete | undefined) {
    this._delete = routeSchema
  }

  public get get() {
    return this._get
  }

  public get put() {
    return this._put
  }

  public get post() {
    return this._post
  }

  public get patch() {
    return this._patch
  }

  public get delete() {
    return this._delete
  }
}
