import type { Profile } from '_DOMEnt/entities/profile'

export abstract class ProfileRepository {
  abstract findById(id: string): Promise<Profile | null>
  abstract create(avatar: Profile): Promise<void>
  abstract save(avatar: Profile): Promise<void>
  abstract delete(avatar: Profile): Promise<void>
}
