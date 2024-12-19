import type { IDomainEvent } from '_COR/events/domain-events'

import { AggregateRoot } from '_COR/entities/aggregate-root'
import { DomainEvents } from '_COR/events/domain-events'
import { vi } from 'vitest'

class CustomAggregateCreated implements IDomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line
  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId() {
    return this.aggregate.id
  }
}
class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)
    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))
    return aggregate
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to events', async () => {
    const callbackSpy = vi.fn()

    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)
    const aggregate = CustomAggregate.create()
    expect(aggregate.domainEvents).toHaveLength(1)

    DomainEvents.dispatchEventsForAggregate(aggregate.id)
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})

describe('Core', () => {
  describe('Events', () => {
    describe('Profile', () => {
      describe('Register', () => {
        it('should be able', async () => {
          DomainEvents.register(() => {}, CustomAggregateCreated.name)
          const aggregate = CustomAggregate.create()
          expect(aggregate.domainEvents).toHaveLength(1)
        })
      })
      describe('Dispatch', () => {
        it('should be able', async () => {
          const callbackSpy = vi.fn()

          DomainEvents.register(callbackSpy, CustomAggregateCreated.name)
          const aggregate = CustomAggregate.create()

          DomainEvents.dispatchEventsForAggregate(aggregate.id)
          expect(callbackSpy).toHaveBeenCalled()
          expect(aggregate.domainEvents).toHaveLength(0)
        })
      })
    })
  })
})
