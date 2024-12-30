import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { INetwork, TNetworkProps } from '@DOMTypes/enterprise/entities/network'

import { AggregateRoot } from '_COR/entities/aggregate-root'
import { Optional } from '@CORTypes/optional'

import { NetworkPostList } from './network-post-list'

export type * from '@DOMTypes/enterprise/entities/network'

export class Network extends AggregateRoot<TNetworkProps> implements INetwork {
  static create(props: Optional<TNetworkProps, 'posts'>, id?: UniqueEntityID) {
    return new Network({ ...props, posts: props.posts ?? new NetworkPostList() }, id)
  }

  public set posts(posts: NetworkPostList) {
    this._props.posts = posts
  }

  public set avatar(avatar: string) {
    this._props.avatar = avatar
  }

  public get name() {
    return this._props.name
  }

  public get username() {
    return this._props.username
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
}
