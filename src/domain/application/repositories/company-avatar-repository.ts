import type { CompanyAvatar } from '_DOMEnt/entities/company-avatar'

export abstract class CompanyAvatarRepository {
  abstract createMany(avatars: CompanyAvatar[]): Promise<void>
  abstract deleteMany(avatars: CompanyAvatar[]): Promise<void>
  abstract findManyByCompanyId(companyId: string): Promise<CompanyAvatar[]>
  abstract deleteManyByCompanyId(companyId: string): Promise<void>
}
