import { UseCaseError } from '_COR/erros/use-case-error'

export class UserWrongCredentialsError extends UseCaseError {
  constructor() {
    super('Credentials are not valid', {
      name: 'UserWrongCredentialsError',
      action: 'Check if the credentials are correct',
      code: 'forbidden',
    })
  }
}
