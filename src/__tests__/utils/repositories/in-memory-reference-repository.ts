import type { IReferenceRepository } from '@DOMTypes/application/repositories/reference-repository'

import { Reference } from '_DOMEnt/entities/reference'

export class InMemoryReferenceRepository implements IReferenceRepository {
  public itens: Reference[] = []

  async findById(referenceId: string) {
    const reference = this.itens.find((item) => item.id.toString() === referenceId)

    if (!reference) return null
    return reference
  }

  async create(reference: Reference) {
    this.itens.push(reference)
  }

  async save(reference: Reference) {
    const itemIndex = this.itens.findIndex((item) => item.id === reference.id)
    this.itens[itemIndex] = reference
  }

  async delete(reference: Reference) {
    const itemIndex = this.itens.findIndex((item) => item.id === reference.id)
    this.itens.splice(itemIndex, 1)
  }
}
