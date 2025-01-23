import type { ReferenceRepository } from '_DOMApp/repositories/reference-repository'
import type { Reference } from '_DOMEnt/entities/reference'

export class PrismaReferenceRepository implements ReferenceRepository {
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
