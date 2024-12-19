import type { IDomainEvent } from '@CORTypes/event'

import { DomainEvents } from '_COR/events/domain-events'

import { Entity } from './entity'

export abstract class AggregateRoot<TProps> extends Entity<TProps> {
  private _domainEvents: IDomainEvent[] = []

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents() {
    this._domainEvents = []
  }
}
