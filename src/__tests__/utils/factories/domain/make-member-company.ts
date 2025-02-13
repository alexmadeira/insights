import type { TMemberCompanyProps } from '_DOMEnt/entities/member-company'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { MemberCompany } from '_DOMEnt/entities/member-company'

export function makeMemberCompany(overrides: Partial<TMemberCompanyProps> = {}, id?: UniqueEntityID) {
  return MemberCompany.create(
    {
      memberId: new UniqueEntityID(),
      companyId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
