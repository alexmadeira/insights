import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { IUser, TUserProps } from '@DOMTypes/enterprise/entities/user'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/user'

export class User extends Entity<TUserProps> implements IUser {
  static create(props: TUserProps, id?: UniqueEntityID) {
    const user = new User(props, id)
    return user
  }

  public set name(name: string) {
    this._props.name = name
  }

  public set email(email: string) {
    this._props.email = email
  }

  public set hash(hash: string) {
    this._props.hash = hash
  }

  public set indetifier(indetifier: string) {
    this._props.indetifier = indetifier
  }

  public get name() {
    return this._props.name
  }

  public get email() {
    return this._props.email
  }

  public get hash() {
    return this._props.hash
  }

  public get indetifier() {
    return this._props.indetifier
  }
}
