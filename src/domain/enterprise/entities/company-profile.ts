import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { ICompanyProfile, TCompanyProfileProps } from '@DOMTypes/enterprise/entities/company-profile'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/company-profile'

export class CompanyProfile extends Entity<TCompanyProfileProps> implements ICompanyProfile {
  static create(props: TCompanyProfileProps, id?: UniqueEntityID) {
    return new CompanyProfile(props, id)
  }

  public get companyId() {
    return this._props.companyId
  }

  public get profileId() {
    return this._props.profileId
  }
}
