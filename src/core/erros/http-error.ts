import type { IHttpError, THttpErrorProps } from '@CORTypes/errors/http-error'

import { BaseError } from './base-error'

export abstract class HttpError extends BaseError implements IHttpError {
  protected readonly _props: THttpErrorProps

  constructor(message: string, props: THttpErrorProps) {
    super(message, { ...props, type: 'HTTP_ERROR' })
    this._props = props
  }

  public toJSON() {
    return {
      name: this.name,
      type: this.type,
      action: this.action,
      message: this.message,
      httpStatus: this.httpStatus,
      cause: this.cause,
    }
  }
}
