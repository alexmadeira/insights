import type { ProfileReferenceRepository } from '_DOM/application/repositories/profile-reference-repository'
import type { ProfileRepository } from '_DOM/application/repositories/profile-repository'
import type { Profile } from '_DOM/enterprise/entities/profile'

export class InMemoryProfileRepository implements ProfileRepository {
  public itens: Profile[] = []

  constructor(private readonly profileReferenceRepository: ProfileReferenceRepository) {}

  async findById(profileId: string) {
    const profile = this.itens.find((item) => item.id.toString() === profileId)

    if (!profile) return null
    return profile
  }

  async create(profile: Profile) {
    this.itens.push(profile)

    this.profileReferenceRepository.createMany(profile.references.getItems())

    return profile
  }

  async save(profile: Profile) {
    const itemIndex = this.itens.findIndex((item) => item.id === profile.id)
    this.itens[itemIndex] = profile

    this.profileReferenceRepository.createMany(profile.references.getNewItems())
    this.profileReferenceRepository.deleteMany(profile.references.getRemovedItems())

    return profile
  }

  async delete(profile: Profile) {
    const itemIndex = this.itens.findIndex((item) => item.id === profile.id)
    this.itens.splice(itemIndex, 1)

    this.profileReferenceRepository.deleteManyByProfileId(profile.id.toString())
  }
}
