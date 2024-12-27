import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { ICompanyAvatar, TCompanyAvatarProps } from '@DOMTypes/enterprise/entities/company-avatar'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/company-avatar'

export class CompanyAvatar extends Entity<TCompanyAvatarProps> implements ICompanyAvatar {
  static create(props: TCompanyAvatarProps, id?: UniqueEntityID) {
    return new CompanyAvatar(props, id)
  }

  public get companyId() {
    return this._props.companyId
  }

  public get avatarId() {
    return this._props.avatarId
  }
}
