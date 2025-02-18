import type { HashComparer } from '_DOM/application/services/cryptography/hash-comparer'
import type { HashGenerator } from '_DOM/application/services/cryptography/hash-generator'

import { compare, hash } from 'bcryptjs'

export class BcryptHasher implements HashGenerator, HashComparer {
  private readonly SALT = 8
  async hash(plain: string) {
    return hash(plain, this.SALT)
  }

  async compare(plain: string, hash: string) {
    return compare(plain, hash)
  }
}
