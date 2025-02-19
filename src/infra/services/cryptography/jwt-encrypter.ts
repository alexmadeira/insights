import type { Encrypter } from '_DOM/application/services/cryptography/encrypter'

import { AccessTokenInvalidError } from '_INF/http/_error/access-token-invalid-error'
import { AccessTokenNotProvidedError } from '_INF/http/_error/access-token-not-provided-error'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

export class JwtEncrypter implements Encrypter {
  constructor(
    private readonly privateKey: string | Buffer<ArrayBufferLike>,
    private readonly publicKey: string | Buffer<ArrayBufferLike>,
  ) {}

  private parser(authorization?: string) {
    if (!authorization) throw new AccessTokenNotProvidedError()

    if (!_.startsWith(authorization, 'Bearer')) throw new AccessTokenInvalidError()

    const [, token] = authorization.split(' ')
    if (!token) throw new AccessTokenInvalidError()

    return token
  }

  public async encrypt(payload: Record<string, unknown>) {
    const token = jwt.sign(payload, this.privateKey, { algorithm: 'RS256' })

    return token
  }

  public async verify(authorization: string) {
    try {
      jwt.verify(this.parser(authorization), this.publicKey, { algorithms: ['RS256'] })
    } catch (err) {
      console.error(err)
    }
  }
}
