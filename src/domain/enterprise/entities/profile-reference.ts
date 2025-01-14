import type { IProfileReference, TProfileReferenceProps } from '@DOMTypes/enterprise/entities/profile-reference'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/profile-reference'

export class ProfileReference extends Entity<TProfileReferenceProps> implements IProfileReference {
  static create(props: TProfileReferenceProps, id?: UniqueEntityID) {
    return new ProfileReference(props, id)
  }

  public get profileId() {
    return this._props.profileId
  }

  public get referenceId() {
    return this._props.referenceId
  }
}
