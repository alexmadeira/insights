export interface Encrypter {
  encrypt(payload: Record<string, unknown>): Promise<string>
  verify(payload?: string): Promise<void>
}
