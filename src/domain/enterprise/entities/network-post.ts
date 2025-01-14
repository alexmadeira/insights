import type { INetworkPost, TNetworkPostProps } from '@DOMTypes/enterprise/entities/network-post'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/network-post'

export class NetworkPost extends Entity<TNetworkPostProps> implements INetworkPost {
  static create(props: TNetworkPostProps, id?: UniqueEntityID) {
    return new NetworkPost(props, id)
  }

  public get networkId() {
    return this._props.networkId
  }

  public get postId() {
    return this._props.postId
  }
}
