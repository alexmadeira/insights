import type { Company } from '_DOMEnt/entities/company'

export interface CompanyRepository {
  findById(id: string): Promise<Company | null>
  create(avatar: Company): Promise<Company>
  save(avatar: Company): Promise<Company>
  delete(avatar: Company): Promise<void>
}
