import type { ProfileRepository } from '_DOMApp/repositories/profile-repository'
import type { Profile } from '_DOMEnt/entities/profile'

export class InMemoryProfileRepository implements ProfileRepository {
  public itens: Profile[] = []

  async findById(profileId: string) {
    const profile = this.itens.find((item) => item.id.toString() === profileId)

    if (!profile) return null
    return profile
  }

  async create(profile: Profile) {
    this.itens.push(profile)
  }

  async save(profile: Profile) {
    const itemIndex = this.itens.findIndex((item) => item.id === profile.id)
    this.itens[itemIndex] = profile
  }

  async delete(profile: Profile) {
    const itemIndex = this.itens.findIndex((item) => item.id === profile.id)
    this.itens.splice(itemIndex, 1)
  }
}
