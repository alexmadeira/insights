import type { ProfileReference } from '_DOMEnt/entities/profile-reference'

export abstract class ProfileReferenceRepository {
  abstract createMany(references: ProfileReference[]): Promise<void>
  abstract deleteMany(references: ProfileReference[]): Promise<void>
  abstract findManyByProfileId(profileId: string): Promise<ProfileReference[]>
  abstract deleteManyByProfileId(profileId: string): Promise<void>
}
