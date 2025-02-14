import type { HashComparer } from '_DOMApp/services/cryptography/hash-comparer'
import type { HashGenerator } from '_DOMApp/services/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
