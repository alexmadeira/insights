import type { MemberAvatar } from '_DOMEnt/entities/member-avatar'

export abstract class MemberAvatarRepository {
  abstract findByAvatarId(id: string): Promise<MemberAvatar | null>
  abstract create(memberAvatar: MemberAvatar): Promise<void>
  abstract save(memberAvatar: MemberAvatar): Promise<void>
  abstract delete(memberAvatar: MemberAvatar): Promise<void>
}
