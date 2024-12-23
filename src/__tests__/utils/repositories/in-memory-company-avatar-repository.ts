import type { CompanyAvatarRepository } from '_DOMApp/repositories/company-avatar-repository'
import type { CompanyAvatar } from '_DOMEnt/entities/company-avatar'

export class InMemoryCompanyAvatarRepository implements CompanyAvatarRepository {
  public itens: CompanyAvatar[] = []

  async findByAvatarId(avatarId: string) {
    const companyAvatar = this.itens.find((item) => item.id.equals(avatarId))

    if (!companyAvatar) return null
    return companyAvatar
  }

  async create(companyAvatar: CompanyAvatar) {
    this.itens.push(companyAvatar)
  }

  async save(companyAvatar: CompanyAvatar) {
    const itemIndex = this.itens.findIndex((item) => item.id.equals(companyAvatar.id))

    this.itens[itemIndex] = companyAvatar
  }

  async delete(companyAvatar: CompanyAvatar) {
    const itemIndex = this.itens.findIndex((item) => item.id.equals(companyAvatar.id))
    this.itens.splice(itemIndex, 1)
  }
}
