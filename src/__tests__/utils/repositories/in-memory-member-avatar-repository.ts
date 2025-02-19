import type { MemberAvatarRepository } from '_DOM/application/repositories/member-avatar-repository'
import type { MemberAvatar } from '_DOM/enterprise/entities/member-avatar'

export class InMemoryMemberAvatarRepository implements MemberAvatarRepository {
  public itens: MemberAvatar[] = []

  async create(memberAvatar: MemberAvatar) {
    this.itens.push(memberAvatar)

    return memberAvatar
  }

  async createMany(avatars: MemberAvatar[]) {
    this.itens.push(...avatars)
  }

  async deleteMany(avatars: MemberAvatar[]) {
    this.itens = this.itens.filter((item) => !avatars.some((avatar) => avatar.equals(item)))
  }

  async findManyByMemberId(memberId: string) {
    return this.itens.filter((item) => item.memberId.toString() === memberId)
  }

  async deleteManyByMemberId(memberId: string) {
    this.itens = this.itens.filter((item) => item.memberId.toString() !== memberId)
  }
}
