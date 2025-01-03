import type { Profile } from '_DOMEnt/entities/profile'

export interface ProfileRepository {
  findById(id: string): Promise<Profile | null>
  create(avatar: Profile): Promise<void>
  save(avatar: Profile): Promise<void>
  delete(avatar: Profile): Promise<void>
}
