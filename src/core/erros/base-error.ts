import type { IBaseError, TBaseErrorProps } from '@CORTypes/errors/base-error'

import { HttpStatus } from '_COR/entities/value-objects'

export abstract class BaseError extends Error implements IBaseError {
  private readonly _http: HttpStatus

  constructor(
    message: string,
    private readonly props: TBaseErrorProps,
  ) {
    super(message, { cause: props.cause })

    this.props = props
    this._http = new HttpStatus(this.props.code)
  }

  public get name() {
    return this.props.name
  }

  public get type() {
    return this.props.type
  }

  public get action() {
    return this.props.action
  }

  public get httpStatus() {
    return this._http
  }

  public get cause() {
    return this.props.cause
  }
}
