import type { UserAvatar } from '_DOMEnt/entities/user-avatar'

export abstract class UserAvatarRepository {
  abstract findById(id: string): Promise<UserAvatar | null>
  // abstract fetchOrCreate(userId: string): Promise<UserAvatar>
  abstract create(userAvatar: UserAvatar): Promise<void>
  abstract save(userAvatar: UserAvatar): Promise<void>
  abstract delete(userAvatar: UserAvatar): Promise<void>
}
