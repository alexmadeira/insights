import type { Encrypter } from '_DOMApp/services/cryptography/encrypter'

import { env } from '_INF/env'
import jwt from 'jsonwebtoken'

export class JwtEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    const privateKey = Buffer.from(env.JWT_PRIVATE_KEY, 'base64')
    const publicKey = Buffer.from(env.JWT_PUBLIC_KEY, 'base64')

    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' })

    jwt.verify(token, publicKey, { algorithms: ['RS256'] })

    return token
  }
}
