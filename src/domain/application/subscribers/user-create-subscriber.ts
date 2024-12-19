import type { IEventHandler } from '@CORTypes/event'

import { DomainEvents } from '_COR/events/domain-events'
import { UserEvent } from '_DOMEnt/events/user-event'

export class UserCreateSbscriber implements IEventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions() {
    DomainEvents.register(this.createEmptyAvatar.bind(this), UserEvent.name)
  }

  private async createEmptyAvatar({ user }: UserEvent) {
    console.log(user)
  }
}
