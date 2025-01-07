import type { IRouteSchema, TRouteSchemaProps, TRouteSchemaSchema } from '@CORTypes/http/route/schema/route-schema'

import { httpResponseCode } from '_COR/constants/parse/http'
import { TEHttpResponseCode } from '@CORTypes/enums/http'
import { ZRouteResponseStatus, ZRouteSchemaSchema } from '@CORTypes/http/route/schema/route-schema'
import _ from 'lodash'

export abstract class RouteSchema<TProps extends TRouteSchemaProps> implements IRouteSchema {
  protected readonly _props: TProps

  protected constructor(props: TProps) {
    this._props = props
  }

  public get path() {
    return this._props.path
  }

  private get response() {
    return ZRouteResponseStatus.parse(
      _.mapKeys(this._props.response, (_, key) => httpResponseCode[key as TEHttpResponseCode] || key),
    )
  }

  private clearSchema(schema: TRouteSchemaSchema) {
    return ZRouteSchemaSchema.parse(
      _.pickBy(schema, (value) => {
        if (_.isNull(value) || _.isUndefined(value)) return false
        if (_.isString(value) && _.isEmpty(value.trim())) return false
        if (_.isArray(value) && _.isEmpty(value)) return false
        if (_.isObject(value) && _.isEmpty(value)) return false
        return true
      }),
    )
  }

  public get schema() {
    return this.clearSchema({
      tags: this._props.tags,
      summary: this._props.summary,
      description: this._props.description,
      body: this._props.body,
      params: this._props.params,
      headers: this._props.headers,
      querystring: this._props.querystring,
      response: this.response,
    })
  }
}
