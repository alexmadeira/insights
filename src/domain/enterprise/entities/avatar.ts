import type { IAvatar, TAvatarProps } from '@DOMTypes/enterprise/entities/avatar'

import { Entity } from '_COR/entities/entity'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { Acronym } from './value-objects'

export type * from '@DOMTypes/enterprise/entities/avatar'

export abstract class Avatar<TProps extends TAvatarProps> extends Entity<TProps> implements IAvatar {
  private _acronym: Acronym

  protected constructor(props: TProps, id?: UniqueEntityID) {
    super(props, id)
    this._acronym = Acronym.create(props.name)
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

  public set url(url: string | null) {
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
