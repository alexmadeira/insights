import type { Avatar } from '_DOMEnt/entities/avatar'

export interface AvatarRepository {
  findById(id: string): Promise<Avatar | null>
  create(userAvatar: Avatar): Promise<void>
  save(userAvatar: Avatar): Promise<void>
  delete(userAvatar: Avatar): Promise<void>
}
