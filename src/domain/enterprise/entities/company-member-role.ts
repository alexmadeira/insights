import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { ICompanyMemberRole, TCompanyMemberRoleProps } from '@DOMTypes/enterprise/entities/company-member-role'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/company-team'

export class CompanyMemberRole extends Entity<TCompanyMemberRoleProps> implements ICompanyMemberRole {
  static create(props: TCompanyMemberRoleProps, id?: UniqueEntityID) {
    return new CompanyMemberRole(props, id)
  }

  public get companyId() {
    return this._props.companyId
  }

  public get memberId() {
    return this._props.memberId
  }

  public get role() {
    return this._props.role
  }
}
