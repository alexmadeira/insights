import type { MemberCompany } from '_DOMEnt/entities/member-company'

export abstract class MemberCompanyRepository {
  abstract createMany(companys: MemberCompany[]): Promise<void>
  abstract deleteMany(companys: MemberCompany[]): Promise<void>
  abstract findManyByMemberId(memberId: string): Promise<MemberCompany[]>
  abstract deleteManyByMemberId(memberId: string): Promise<void>
}
