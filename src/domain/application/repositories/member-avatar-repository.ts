import type { MemberAvatar } from '_DOMEnt/entities/member-avatar'

export abstract class MemberAvatarRepository {
  abstract createMany(avatars: MemberAvatar[]): Promise<void>
  abstract deleteMany(avatars: MemberAvatar[]): Promise<void>
  abstract findManyByMemberId(memberId: string): Promise<MemberAvatar[]>
  abstract deleteManyByMemberId(memberId: string): Promise<void>
}
