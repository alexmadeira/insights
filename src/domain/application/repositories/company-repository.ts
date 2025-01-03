import type { Company } from '_DOMEnt/entities/company'

export interface CompanyRepository {
  findById(id: string): Promise<Company | null>
  create(avatar: Company): Promise<void>
  save(avatar: Company): Promise<void>
  delete(avatar: Company): Promise<void>
}
