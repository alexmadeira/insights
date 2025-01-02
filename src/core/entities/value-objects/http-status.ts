import type { TEHttpResponseCategory, TEHttpResponseCode } from '@CORTypes/enums/http'

import { httpCodeDescription, httpResponseCategory, httpResponseCode } from '_COR/constants/parse/http'
import { ZEHttpResponseCode, ZHttpStatusCodeCategory } from '@CORTypes/enums/http'
import _ from 'lodash'

export class HttpStatus {
  private readonly _statusCode: number

  private readonly _responseCode: TEHttpResponseCode
  private readonly _categoryCode: TEHttpResponseCategory

  constructor(code: TEHttpResponseCode | number) {
    this._responseCode = this.parseToResponseCode(code)
    this._statusCode = httpResponseCode[this._responseCode]
    this._categoryCode = ZHttpStatusCodeCategory.parse(httpResponseCode[this._responseCode])
  }

  private parseToResponseCode(code: string | number): TEHttpResponseCode {
    if (typeof code === 'number') return ZEHttpResponseCode.parse(_.findKey(httpResponseCode, (val) => val === code))

    return ZEHttpResponseCode.parse(code)
  }

  public get code() {
    return this._statusCode || 500
  }

  public get categoryCode() {
    return this._categoryCode
  }

  public get messageCode() {
    return this._responseCode
  }

  public get category() {
    return {
      code: this.categoryCode,
      value: httpResponseCategory[this._categoryCode],
    }
  }

  public get message() {
    return {
      code: this._responseCode,
      value: httpCodeDescription[this._responseCode],
    }
  }

  public toJSON() {
    return {
      code: this.code,
      category: this.category,
      message: this.message,
    }
  }
}
