import { UseCaseError } from '_COR/erros/use-case-error'

export class UserAlreadyExistisError extends UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" alrealdy exists`, {
      name: 'UserAlreadyExistisError',
      action: 'send a different user identifier',
      code: 'conflict',
    })
  }
}
