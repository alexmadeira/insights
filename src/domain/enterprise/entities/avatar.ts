import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { IAvatar, TAvatarProps } from '@DOMTypes/enterprise/entities/avatar'

import { Entity } from '_COR/entities/entity'

import { Acronym } from './value-objects'

export type * from '@DOMTypes/enterprise/entities/avatar'

export class Avatar extends Entity<TAvatarProps> implements IAvatar {
  static create({ createdAt, ...props }: Optional<Omit<TAvatarProps, 'acronym'>, 'createdAt'>, id?: UniqueEntityID) {
    return new Avatar(
      {
        ...props,
        acronym: Acronym.create(props.name),
        createdAt: createdAt ?? new Date(),
      },
      id,
    )
  }

  public get name() {
    return this._props.name
  }

  public set name(name: string) {
    this._props.name = name
    this._props.acronym = Acronym.create(name)
  }

  public get url() {
    return this._props.url
  }

  public set url(url: string) {
    this._props.url = url
  }

  public get acronym() {
    return this._props.acronym
  }

  public get createdAt() {
    return this._props.createdAt
  }

  public get updatedAt() {
    return this._props.updatedAt
  }
}
