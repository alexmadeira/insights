import type { TCompanyProfileProps } from '_DOMEnt/entities/company-profile'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CompanyProfile } from '_DOMEnt/entities/company-profile'

export function makeCompanyProfile(overrides: Partial<TCompanyProfileProps> = {}, id?: UniqueEntityID) {
  return CompanyProfile.create(
    {
      companyId: new UniqueEntityID(),
      profileId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
