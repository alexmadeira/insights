import type { CompanyAvatar } from '_DOMEnt/entities/company-avatar'

export interface CompanyAvatarRepository {
  createMany(avatars: CompanyAvatar[]): Promise<void>
  deleteMany(avatars: CompanyAvatar[]): Promise<void>
  findManyByCompanyId(companyId: string): Promise<CompanyAvatar[]>
  deleteManyByCompanyId(companyId: string): Promise<void>
}
