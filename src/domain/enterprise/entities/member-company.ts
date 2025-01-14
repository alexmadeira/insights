import type { IMemberCompany, TMemberCompanyProps } from '@DOMTypes/enterprise/entities/member-company'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/member-company'

export class MemberCompany extends Entity<TMemberCompanyProps> implements IMemberCompany {
  static create(props: TMemberCompanyProps, id?: UniqueEntityID) {
    return new MemberCompany(props, id)
  }

  public get memberId() {
    return this._props.memberId
  }

  public get companyId() {
    return this._props.companyId
  }
}
