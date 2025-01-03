import type { MemberAvatar } from '_DOMEnt/entities/member-avatar'

export interface MemberAvatarRepository {
  createMany(avatars: MemberAvatar[]): Promise<void>
  deleteMany(avatars: MemberAvatar[]): Promise<void>
  findManyByMemberId(memberId: string): Promise<MemberAvatar[]>
  deleteManyByMemberId(memberId: string): Promise<void>
}
