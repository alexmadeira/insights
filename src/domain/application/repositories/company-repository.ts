import type { Company } from '_DOMEnt/entities/company'

export abstract class CompanyRepository {
  abstract findById(id: string): Promise<Company | null>
  abstract create(avatar: Company): Promise<void>
  abstract save(avatar: Company): Promise<void>
  abstract delete(avatar: Company): Promise<void>
}
