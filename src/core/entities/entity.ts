import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<TProps> {
  private readonly _id: UniqueEntityID
  protected readonly _props: TProps

  protected constructor(props: TProps, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this._props = props
  }

  public get id() {
    return this._id
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) return true
    if (entity.id === this._id) return true

    return false
  }
}
