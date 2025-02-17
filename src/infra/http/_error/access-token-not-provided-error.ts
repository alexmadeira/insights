import { HttpError } from '_COR/erros/http-error'

export class AccessTokenNotProvidedError extends HttpError {
  constructor() {
    super('The access token not provided', {
      name: 'AccessTokenNotProvidedError',
      action: 'try to login again',
      code: 'unauthorized',
    })
  }
}
