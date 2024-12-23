import type { CompanyAvatar } from '_DOMEnt/entities/company-avatar'

export abstract class CompanyAvatarRepository {
  abstract findByAvatarId(id: string): Promise<CompanyAvatar | null>
  abstract create(companyAvatar: CompanyAvatar): Promise<void>
  abstract save(companyAvatar: CompanyAvatar): Promise<void>
  abstract delete(companyAvatar: CompanyAvatar): Promise<void>
}
