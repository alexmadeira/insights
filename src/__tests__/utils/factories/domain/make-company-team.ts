import type { TCompanyTeamProps } from '_DOMEnt/entities/company-team'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CompanyTeam } from '_DOMEnt/entities/company-team'

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
