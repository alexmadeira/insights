import type { MemberCompany } from '_DOMEnt/entities/member-company'

export interface MemberCompanyRepository {
  create(memberCompany: MemberCompany): Promise<MemberCompany>
  createMany(memberCompanies: MemberCompany[]): Promise<void>
  deleteMany(memberCompanies: MemberCompany[]): Promise<void>
  findManyByMemberId(memberId: string): Promise<MemberCompany[]>
  deleteManyByMemberId(memberId: string): Promise<void>
}
