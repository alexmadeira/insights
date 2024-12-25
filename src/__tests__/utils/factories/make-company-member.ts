import type { TCompanyMemberProps } from '_DOMEnt/entities/company-member'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CompanyMember } from '_DOMEnt/entities/company-member'

export function makeCompanyMember(overrides: Partial<TCompanyMemberProps> = {}, id?: UniqueEntityID) {
  return CompanyMember.create(
    {
      companyId: new UniqueEntityID(),
      memberId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
