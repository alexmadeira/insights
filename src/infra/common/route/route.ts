import type { Optional } from '@CORTypes/optional'
import type {
  IRoute,
  TRouteEditProps,
  TRouteGetProps,
  TRouteProps,
  TRouteRemoveProps,
  TRouteRequest,
  TRouteSchema,
  TRoutesSendProps,
} from '@INFTypes/common/route'
import type { TFastifyInstance } from '@INFTypes/http/config/fastify'

import { httpMethodOperationId, httpMethodPath } from '_COR/constants/parse/http'
import { RouteGroup } from '_INFCommon/route/group'
import _ from 'lodash'

export class Route implements IRoute {
  protected constructor(
    private readonly _request: TRouteRequest,
    private readonly _schema: Optional<TRouteSchema, 'headers' | 'body' | 'params' | 'querystring'>,
  ) {
    this.route = this.route.bind(this)
  }

  protected static create(props: Optional<TRouteProps, 'headers' | 'body' | 'params' | 'querystring'>) {
    const routeGroup = RouteGroup.create(props.routeGroup)
    const groups = _.concat([], routeGroup.name, props.groups ?? [])

    return new Route(
      {
        method: props.method,
        path: routeGroup.path(props.path ?? httpMethodPath[props.method]),
      },
      {
        groups,
        body: props.body,
        params: props.params,
        summary: props.summary,
        headers: props.headers,
        description: props.description,
        querystring: props.querystring,
        operationId: props.operationId ?? _.camelCase([httpMethodOperationId[props.method], ...groups].join(' ')),
      },
    )
  }

  static post(props: TRoutesSendProps) {
    return this.create({ ...props, method: 'post' })
  }

  static get(props: TRouteGetProps) {
    return this.create({ ...props, method: 'get' })
  }

  static put(props: TRouteEditProps) {
    return this.create({ ...props, method: 'put' })
  }

  static patch(props: TRouteEditProps) {
    return this.create({ ...props, method: 'patch' })
  }

  static delete(props: TRouteRemoveProps) {
    return this.create({ ...props, method: 'delete' })
  }

  public get method() {
    return this._request.method
  }

  public get path() {
    return this._request.path
  }

  public get tags() {
    return this._schema.groups
  }

  public get summary() {
    return this._schema.summary
  }

  public get description() {
    return this._schema.description
  }

  public get operationId() {
    return this._schema.operationId
  }

  public get body() {
    return this._schema.body
  }

  public get params() {
    return this._schema.params
  }

  public get querystring() {
    return this._schema.querystring
  }

  public get headers() {
    return this._schema.headers
  }

  public get schema() {
    return {
      tags: this.tags,
      summary: this.summary,
      description: this.description,
      operationId: this.operationId,
      body: this.body,
      params: this.params,
      querystring: this.querystring,
      headers: this.headers,
    }
  }

  public route(fastify: TFastifyInstance) {
    fastify.route({
      url: this.path,
      method: this.method,
      schema: this.schema,
      handler: async () => {
        return { ok: true }
      },
    })
  }
}
