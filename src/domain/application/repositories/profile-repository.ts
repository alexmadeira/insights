import type { Profile } from '_DOM/enterprise/entities/profile'

export interface ProfileRepository {
  findById(id: string): Promise<Profile | null>
  create(avatar: Profile): Promise<Profile>
  save(avatar: Profile): Promise<Profile>
  delete(avatar: Profile): Promise<void>
}
