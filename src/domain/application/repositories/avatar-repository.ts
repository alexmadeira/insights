import type { Avatar } from '_DOMEnt/entities/avatar'

export interface AvatarRepository {
  findById(id: string): Promise<Avatar | null>
  create(userAvatar: Avatar): Promise<Avatar>
  save(userAvatar: Avatar): Promise<Avatar>
  delete(userAvatar: Avatar): Promise<void>
}
