import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { ICompanyMember, TCompanyMemberProps } from '@DOMTypes/enterprise/entities/company-member'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/company-member'

export class CompanyMember extends Entity<TCompanyMemberProps> implements ICompanyMember {
  static create(props: TCompanyMemberProps, id?: UniqueEntityID) {
    return new CompanyMember(props, id)
  }

  public get companyId() {
    return this._props.companyId
  }

  public get member() {
    return this._props.member
  }
}
