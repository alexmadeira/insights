import type { CompanyAvatar } from '_DOM/enterprise/entities/company-avatar'

export interface CompanyAvatarRepository {
  create(companyAvatar: CompanyAvatar): Promise<CompanyAvatar>
  createMany(companyAvatar: CompanyAvatar[]): Promise<void>
  deleteMany(companyAvatar: CompanyAvatar[]): Promise<void>
  findManyByCompanyId(companyId: string): Promise<CompanyAvatar[]>
  deleteManyByCompanyId(companyId: string): Promise<void>
}
