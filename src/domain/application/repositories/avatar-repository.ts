import type { Avatar } from '_DOMEnt/entities/avatar'

export abstract class AvatarRepository {
  abstract findById(id: string): Promise<Avatar | null>
  abstract create(userAvatar: Avatar): Promise<void>
  abstract save(userAvatar: Avatar): Promise<void>
  abstract delete(userAvatar: Avatar): Promise<void>
}
