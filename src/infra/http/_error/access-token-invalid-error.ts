import { HttpError } from '_COR/erros/http-error'

export class AccessTokenInvalidError extends HttpError {
  constructor() {
    super('The access token is not valid', {
      name: 'AccessTokenInvalidError',
      action: 'try to login again',
      code: 'unauthorized',
    })
  }
}
