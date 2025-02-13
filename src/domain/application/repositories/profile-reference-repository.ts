import type { ProfileReference } from '_DOMEnt/entities/profile-reference'

export interface ProfileReferenceRepository {
  create(profileReference: ProfileReference): Promise<ProfileReference>
  createMany(profileReference: ProfileReference[]): Promise<void>
  deleteMany(profileReference: ProfileReference[]): Promise<void>
  findManyByProfileId(profileId: string): Promise<ProfileReference[]>
  deleteManyByProfileId(profileId: string): Promise<void>
}
