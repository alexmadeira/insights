import { UseCaseError } from '_COR/erros/use-case-error'

export class ResourceNotFoundError extends UseCaseError {
  constructor() {
    super('Resource not found', {
      name: 'ResourceNotFoundError',
      action: 'The requested resource was not found',
      code: 'not_found',
    })
  }
}
