import type { TCompanyTeamProps } from '_DOM/enterprise/entities/company-team'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CompanyTeam } from '_DOM/enterprise/entities/company-team'

export function makeCompanyTeam(overrides: Partial<TCompanyTeamProps> = {}, id?: UniqueEntityID) {
  return CompanyTeam.create(
    {
      companyId: new UniqueEntityID(),
      teamId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
