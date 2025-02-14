import type { Encrypter } from '_DOMApp/services/cryptography/encrypter'

export class JwtEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}
