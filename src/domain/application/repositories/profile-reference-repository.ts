import type { ProfileReference } from '_DOMEnt/entities/profile-reference'

export interface ProfileReferenceRepository {
  createMany(references: ProfileReference[]): Promise<void>
  deleteMany(references: ProfileReference[]): Promise<void>
  findManyByProfileId(profileId: string): Promise<ProfileReference[]>
  deleteManyByProfileId(profileId: string): Promise<void>
}
