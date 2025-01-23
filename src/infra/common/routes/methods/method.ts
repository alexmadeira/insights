import type { TEHttpResponseCode } from '@CORTypes/enums/http'
import type { IMethod, TMethodProps, TMethodSchema } from '@INFTypes/common/routes/methods'

import { httpResponseCode } from '_COR/constants/parse/http'
import { ZMethodResponseStatus, ZMethodSchema } from '@INFTypes/common/routes/methods'
import _ from 'lodash'

export abstract class Method<TProps extends TMethodProps> implements IMethod {
  protected constructor(
    private readonly _props: TProps,
    private readonly _customkey?: string,
  ) {}

  public get path() {
    return `${this._props.pathPrefix}/${this._props.path}`.replace(/\/\/+/g, '/').replace(/\/$/g, '')
  }

  public get type() {
    return this._props.type
  }

  public get key() {
    return this._customkey ?? `[${this._props.type.toUpperCase()}]::${this.path}`
  }

  private get response() {
    return ZMethodResponseStatus.parse(
      _.mapKeys(this._props.response, (_, key) => httpResponseCode[key as TEHttpResponseCode] || key),
    )
  }

  private clearSchema(schema: TMethodSchema) {
    return ZMethodSchema.parse(
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
