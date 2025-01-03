import type { MemberCompany } from '_DOMEnt/entities/member-company'

export interface MemberCompanyRepository {
  createMany(companys: MemberCompany[]): Promise<void>
  deleteMany(companys: MemberCompany[]): Promise<void>
  findManyByMemberId(memberId: string): Promise<MemberCompany[]>
  deleteManyByMemberId(memberId: string): Promise<void>
}
