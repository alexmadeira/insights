import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import z from 'zod'

export const ZDomainEventCallback = z.function().args(z.any()).returns(z.void())

export const ZDomainEvent = z.object({
  ocurredAt: z.coerce.date(),
  aggregateId: z.custom<UniqueEntityID>(),
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
