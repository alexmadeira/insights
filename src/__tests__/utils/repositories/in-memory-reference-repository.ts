import type { ReferenceRepository } from '_DOM/application/repositories/reference-repository'
import type { Reference } from '_DOM/enterprise/entities/reference'

export class InMemoryReferenceRepository implements ReferenceRepository {
  public itens: Reference[] = []

  async findById(referenceId: string) {
    const reference = this.itens.find((item) => item.id.toString() === referenceId)

    if (!reference) return null
    return reference
  }

  async create(reference: Reference) {
    this.itens.push(reference)

    return reference
  }

  async save(reference: Reference) {
    const itemIndex = this.itens.findIndex((item) => item.id === reference.id)
    this.itens[itemIndex] = reference

    return reference
  }

  async delete(reference: Reference) {
    const itemIndex = this.itens.findIndex((item) => item.id === reference.id)
    this.itens.splice(itemIndex, 1)
  }
}
