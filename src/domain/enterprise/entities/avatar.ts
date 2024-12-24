import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { IAvatar, TAvatarProps } from '@DOMTypes/enterprise/entities/avatar'

import { Entity } from '_COR/entities/entity'

import { Acronym } from './value-objects'

export type * from '@DOMTypes/enterprise/entities/avatar'

export class Avatar<TProps extends TAvatarProps> extends Entity<TProps> implements IAvatar {
  private _acronym: Acronym

  constructor(props: TProps, id?: UniqueEntityID) {
    super(props, id)
    this._acronym = Acronym.create(props.name)
  }

  static create({ createdAt, ...rest }: Optional<TAvatarProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Avatar(
      {
        createdAt: createdAt ?? new Date(),
        ...rest,
      },
      id,
    )
  }

  public get name() {
    return this._props.name
  }

  public set name(name: string) {
    this._props.name = name
    this._acronym = Acronym.create(name)
  }

  public get url() {
    return this._props.url
  }

  public set url(url: string | null | undefined) {
    this._props.url = url
  }

  public get acronym() {
    return this._acronym
  }

  public get createdAt() {
    return this._props.createdAt
  }

  public get updatedAt() {
    return this._props.updatedAt
  }
}
