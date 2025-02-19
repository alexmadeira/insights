import type { TCompanyProfileProps } from '_DOM/enterprise/entities/company-profile'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CompanyProfile } from '_DOM/enterprise/entities/company-profile'

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
