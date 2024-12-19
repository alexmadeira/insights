import type { User } from '_DOMEnt/entities/user'
import type { IDomainEvent } from '@CORTypes/event'
import type { TUserEventProps } from '@DOMTypes/enterprise/events/user-event'

export class UserEvent implements IDomainEvent {
  protected constructor(protected readonly _props: TUserEventProps) {}

  static create(user: User) {
    return new UserEvent({
      user,
      ocurredAt: new Date(),
    })
  }

  public get user() {
    return this._props.user
  }

  public get ocurredAt() {
    return this._props.ocurredAt
  }

  public get aggregateId() {
    return this._props.user.id
  }
}
