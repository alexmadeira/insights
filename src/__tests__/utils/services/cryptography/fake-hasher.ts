import type { HashComparer } from '_DOM/application/services/cryptography/hash-comparer'
import type { HashGenerator } from '_DOM/application/services/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string) {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string) {
    return plain.concat('-hashed') === hash
  }
}
