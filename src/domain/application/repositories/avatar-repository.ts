import type { Avatar } from '_DOM/enterprise/entities/avatar'

export interface AvatarRepository {
  findById(id: string): Promise<Avatar | null>
  create(avatar: Avatar): Promise<Avatar>
  save(avatar: Avatar): Promise<Avatar>
  delete(avatar: Avatar): Promise<void>
}
