import { TERole } from '@DOMTypes/enums/role'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { CompanyMember } from './company-member'
import { MemberRole } from './value-objects'

export class CompanyMemberList extends WatchedList<CompanyMember> {
  compareItems(a: CompanyMember, b: CompanyMember): boolean {
    return a.member.equals(b.member)
  }

  static create(companyId: UniqueEntityID, members: [string, TERole][]) {
    return new CompanyMemberList(
      members.map(([memberId, role]) => {
        return CompanyMember.create({
          companyId,
          member: new MemberRole(memberId, role),
        })
      }),
    )
  }
}
