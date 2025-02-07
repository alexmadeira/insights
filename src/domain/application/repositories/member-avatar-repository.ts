import type { MemberAvatar } from '_DOMEnt/entities/member-avatar'

export interface MemberAvatarRepository {
  create(memberAvatar: MemberAvatar): Promise<MemberAvatar>
  createMany(memberAvatar: MemberAvatar[]): Promise<void>
  deleteMany(memberAvatar: MemberAvatar[]): Promise<void>
  findManyByMemberId(memberId: string): Promise<MemberAvatar[]>
  deleteManyByMemberId(memberId: string): Promise<void>
}
