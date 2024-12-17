import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { INetwork, TNetworkProps } from '@DOMTypes/enterprise/entities/network'

import { Entity } from '_COR/entities/entity'
import { Optional } from '_COR/types/optional'

export type * from '@DOMTypes/enterprise/entities/network'

export class Network extends Entity<TNetworkProps> implements INetwork {
  static create({ createdAt, ...rest }: Optional<TNetworkProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Network(
      {
        ...rest,
        createdAt: createdAt ?? new Date(),
      },
      id,
    )
  }

  public get name() {
    return this._props.name
  }

  public get userName() {
    return this._props.userName
  }

  public get avatar() {
    return this._props.avatar
  }

  public get type() {
    return this._props.type
  }

  public get posts() {
    return this._props.posts
  }

  public get createdAt() {
    return this._props.createdAt
  }

  public get updatedAt() {
    return this._props.updatedAt
  }
}
