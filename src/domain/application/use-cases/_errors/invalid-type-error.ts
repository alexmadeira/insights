import { UseCaseError } from '_COR/erros/use-case-error'

export class InvalidTypeError extends UseCaseError {
  constructor(type: string) {
    super(`The code type '${type}' is invalid`, {
      name: 'InvalidTypeError',
      action: 'The requested type was not found',
      code: 'bad_request',
    })
  }
}
