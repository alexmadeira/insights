import type { Optional } from '@CORTypes/optional'
import type { TFastifyInstance } from '@INFTypes/http/config/fastify'
import type {
  IRoute,
  TRouteEditProps,
  TRouteGetProps,
  TRouteProps,
  TRouteRemoveProps,
  TRouteRequest,
  TRouteSchema,
  TRouteSendProps,
} from '@INFTypes/services/route'

import { httpMethodOperationId } from '_COR/constants/parse/http'
import { zodKeys } from '_COR/utils/zod'
import { ZRouteEditProps, ZRouteGetProps, ZRouteRemoveProps, ZRouteSendProps } from '@INFTypes/services/route'
import _ from 'lodash'

import { RouteGroup } from './group'

export class Route implements IRoute {
  protected constructor(
    private readonly _request: TRouteRequest,
    private readonly _schema: Optional<TRouteSchema, 'headers' | 'body' | 'params' | 'querystring'>,
  ) {
    this.register = this.register.bind(this)
  }

  protected static create(props: Optional<TRouteProps, 'headers' | 'body' | 'params' | 'querystring'>) {
    const routeGroup = RouteGroup.create(props.routeGroup)
    const groups = _.chain(props.groups ?? [])
      .concat(routeGroup.name)
      .compact()
      .value()
    return new Route(
      {
        path: routeGroup.path(props.path, zodKeys(props.params)),
        method: props.method,
        controller: props.controller,
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

  static post(props: TRouteSendProps) {
    return this.create({ ...ZRouteSendProps.parse(props), method: 'post' })
  }

  static get(props: TRouteGetProps) {
    return this.create({ ...ZRouteGetProps.parse(props), method: 'get' })
  }

  static put(props: TRouteEditProps) {
    return this.create({ ...ZRouteEditProps.parse(props), method: 'put' })
  }

  static patch(props: TRouteEditProps) {
    return this.create({ ...ZRouteEditProps.parse(props), method: 'patch' })
  }

  static delete(props: TRouteRemoveProps) {
    return this.create({ ...ZRouteRemoveProps.parse(props), method: 'delete' })
  }

  public get path() {
    return this._request.path
  }

  public get method() {
    return this._request.method
  }

  public get controller() {
    return this._request.controller.handler
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
      body: this.body,
      params: this.params,
      headers: this.headers,
      summary: this.summary,
      description: this.description,
      querystring: this.querystring,
      operationId: this.operationId,
    }
  }

  public register(fastify: TFastifyInstance) {
    fastify.route({
      url: this.path,
      method: this.method,
      schema: _.pickBy(this.schema, Boolean),
      handler: this.controller,
    })
  }
}
