import { IEntity, TEntityProps } from '@CORTypes/entity'

import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<TProps> implements IEntity {
  private readonly _id: UniqueEntityID
  protected readonly _createdAt: Date
  protected readonly _updatedAt?: Date
  protected readonly _props: TProps

  protected constructor(props: TProps & TEntityProps, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this._props = props

    this._createdAt = props.createdAt ?? new Date()
    this._updatedAt = props.updatedAt
  }

  public get id() {
    return this._id
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) return true
    if (entity.id === this._id) return true

    return false
  }

  public get createdAt() {
    return this._createdAt
  }

  public get updatedAt() {
    return this._updatedAt
  }
}
