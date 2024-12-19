import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import z from 'zod'

export const ZDomainEventCallback = z.function().args().returns(z.void())

export const ZDomainEvent = z.object({
  ocurredAt: z.coerce.date(),
  getAggregateId: z.function().returns(z.custom<UniqueEntityID>()),
})

export const ZEventHandler = z.object({
  setupSubscriptions: z.function().returns(z.void()),
})

//
//
//

export type TDomainEventCallback = z.infer<typeof ZDomainEventCallback>

export interface IDomainEvent extends z.infer<typeof ZDomainEvent> {}
export interface IEventHandler extends z.infer<typeof ZEventHandler> {}
