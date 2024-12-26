import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { CompanyMember } from './company-member'

export class CompanyMemberList extends WatchedList<CompanyMember> {
  compareItems(a: CompanyMember, b: CompanyMember): boolean {
    return a.memberId.equals(b.memberId)
  }

  static create(companyId: UniqueEntityID, membersIds: string[]) {
    return new CompanyMemberList(
      membersIds.map((memberId) => {
        return CompanyMember.create({
          companyId,
          memberId: new UniqueEntityID(memberId),
        })
      }),
    )
  }
}
