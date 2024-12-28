import type { ProfileReferenceRepository } from '_DOMApp/repositories/profile-reference-repository'
import type { ProfileReference } from '_DOMEnt/entities/profile-reference'

export class InMemoryProfileReferenceRepository implements ProfileReferenceRepository {
  public itens: ProfileReference[] = []

  async create(profileReference: ProfileReference) {
    this.itens.push(profileReference)
  }

  async createMany(references: ProfileReference[]) {
    this.itens.push(...references)
  }

  async deleteMany(referencess: ProfileReference[]) {
    this.itens = this.itens.filter((item) => !referencess.some((reference) => reference.equals(item)))
  }

  async findManyByProfileId(profileId: string) {
    return this.itens.filter((item) => item.profileId.toString() === profileId)
  }

  async deleteManyByProfileId(profileId: string) {
    this.itens = this.itens.filter((item) => item.profileId.toString() !== profileId)
  }
}
