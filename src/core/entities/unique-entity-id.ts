import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private readonly value: string

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  public toString() {
    return this.value
  }

  public toValue() {
    return this.value
  }

  public equals(id: UniqueEntityID | string) {
    if (id instanceof UniqueEntityID) {
      return id.toValue() === this.value
    }

    return id === this.value
  }
}
