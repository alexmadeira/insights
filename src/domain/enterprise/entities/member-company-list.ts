import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { MemberCompany } from './member-company'

export class MemberCompanyList extends WatchedList<MemberCompany> {
  compareItems(a: MemberCompany, b: MemberCompany): boolean {
    return a.companyId.equals(b.companyId)
  }

  static create(memberId: UniqueEntityID, companysIds: string[]) {
    return new MemberCompanyList(
      companysIds.map((companyId) => {
        return MemberCompany.create({
          memberId,
          companyId: new UniqueEntityID(companyId),
        })
      }),
    )
  }
}
