import type { CompanyAvatarRepository } from '_DOMApp/repositories/company-avatar-repository'
import type { CompanyAvatar } from '_DOMEnt/entities/company-avatar'

export class InMemoryCompanyAvatarRepository implements CompanyAvatarRepository {
  public itens: CompanyAvatar[] = []

  async create(companyAvatar: CompanyAvatar) {
    this.itens.push(companyAvatar)

    return companyAvatar
  }

  async createMany(avatars: CompanyAvatar[]) {
    this.itens.push(...avatars)
  }

  async deleteMany(avatars: CompanyAvatar[]) {
    this.itens = this.itens.filter((item) => !avatars.some((avatar) => avatar.equals(item)))
  }

  async findManyByCompanyId(companyId: string) {
    return this.itens.filter((item) => item.companyId.toString() === companyId)
  }

  async deleteManyByCompanyId(companyId: string) {
    this.itens = this.itens.filter((item) => item.companyId.toString() !== companyId)
  }
}
