import type { Avatar, TAvatarProps } from '_DOMEnt/entities/avatar'

export abstract class AvatarRepository {
  abstract findById(id: string): Promise<Avatar<TAvatarProps> | null>
  abstract create(userAvatar: Avatar<TAvatarProps>): Promise<void>
  abstract save(userAvatar: Avatar<TAvatarProps>): Promise<void>
  abstract delete(userAvatar: Avatar<TAvatarProps>): Promise<void>
}
