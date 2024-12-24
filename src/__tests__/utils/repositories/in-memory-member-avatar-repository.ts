import type { MemberAvatarRepository } from '_DOMApp/repositories/member-avatar-repository'
import type { MemberAvatar } from '_DOMEnt/entities/member-avatar'

export class InMemoryMemberAvatarRepository implements MemberAvatarRepository {
  public itens: MemberAvatar[] = []

  async findByAvatarId(avatarId: string) {
    const memberAvatar = this.itens.find((item) => item.id.equals(avatarId))

    if (!memberAvatar) return null
    return memberAvatar
  }

  async create(memberAvatar: MemberAvatar) {
    this.itens.push(memberAvatar)
  }

  async save(memberAvatar: MemberAvatar) {
    const itemIndex = this.itens.findIndex((item) => item.id.equals(memberAvatar.id))

    this.itens[itemIndex] = memberAvatar
  }

  async delete(memberAvatar: MemberAvatar) {
    const itemIndex = this.itens.findIndex((item) => item.id.equals(memberAvatar.id))
    this.itens.splice(itemIndex, 1)
  }
}
