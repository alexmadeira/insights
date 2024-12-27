import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { INetwork, TNetworkProps } from '@DOMTypes/enterprise/entities/network'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/network'

export class Network extends Entity<TNetworkProps> implements INetwork {
  static create(props: TNetworkProps, id?: UniqueEntityID) {
    return new Network(props, id)
  }

  public get name() {
    return this._props.name
  }

  public get username() {
    return this._props.username
  }

  public get avatar() {
    return this._props.avantar
  }

  public get type() {
    return this._props.type
  }

  public get posts() {
    return this._props.posts
  }
}
