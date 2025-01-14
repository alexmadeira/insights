import type { IAvatar, TAvatarProps } from '@DOMTypes/enterprise/entities/avatar'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { Entity } from '_COR/entities/entity'

import { Acronym } from './value-objects'

export type * from '@DOMTypes/enterprise/entities/avatar'

export class Avatar extends Entity<TAvatarProps> implements IAvatar {
  private _acronym: Acronym

  constructor(props: TAvatarProps, id?: UniqueEntityID) {
    super(props, id)
    this._acronym = new Acronym(props.name)
  }

  static create(props: TAvatarProps, id?: UniqueEntityID) {
    return new Avatar(props, id)
  }

  public set name(name: string) {
    this._props.name = name
    this._acronym = new Acronym(name)
  }

  public set isDefault(isDefault: boolean) {
    this._props.isDefault = isDefault
  }

  public set url(url: string | null | undefined) {
    this._props.url = url
  }

  public get name() {
    return this._props.name
  }

  public get isDefault() {
    return this._props.isDefault
  }

  public get url() {
    return this._props.url
  }

  public get acronym() {
    return this._acronym
  }
}
