import type { IUseCaseError, TUseCaseErrorProps } from '@CORTypes/errors/use-case-error'

import { BaseError } from './base-error'

export abstract class UseCaseError extends BaseError implements IUseCaseError {
  protected readonly _props: TUseCaseErrorProps

  constructor(message: string, props: TUseCaseErrorProps) {
    super(message, { ...props, type: 'use_case_error' })
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
