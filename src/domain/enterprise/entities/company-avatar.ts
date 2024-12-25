import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { ICompanyAvatar, TCompanyAvatarProps } from '@DOMTypes/enterprise/entities/company-avatar'

import { Optional } from '@CORTypes/optional'

import { Avatar } from './avatar'

export type * from '@DOMTypes/enterprise/entities/company-avatar'

export class CompanyAvatar extends Avatar<TCompanyAvatarProps> implements ICompanyAvatar {
  static create(props: Optional<TCompanyAvatarProps, 'createdAt'>, id?: UniqueEntityID) {
    return new CompanyAvatar(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }

  public get companyId() {
    return this._props.companyId
  }

  public set companyId(companyId: UniqueEntityID | undefined) {
    this._props.companyId = companyId
  }
}
