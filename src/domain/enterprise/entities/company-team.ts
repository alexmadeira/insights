import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { ICompanyTeam, TCompanyTeamProps } from '@DOMTypes/enterprise/entities/company-team'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/company-team'

export class CompanyTeam extends Entity<TCompanyTeamProps> implements ICompanyTeam {
  static create(props: TCompanyTeamProps, id?: UniqueEntityID) {
    return new CompanyTeam(props, id)
  }

  public get companyId() {
    return this._props.companyId
  }

  public get teamId() {
    return this._props.teamId
  }
}
