import type { Avatar } from '_DOMEnt/entities/avatar'

export abstract class AvatarRepository {
  abstract findById(id: string): Promise<Avatar | null>
  abstract create(avatar: Avatar): Promise<void>
  abstract save(avatar: Avatar): Promise<void>
  abstract delete(avatar: Avatar): Promise<void>
}
