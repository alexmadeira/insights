import type { ReferenceStatus } from '_DOMEnt/entities/value-objects/reference-status'

import z from 'zod'

export const ZReferenceProps = z.object({
  name: z.string(),
  status: z.custom<ReferenceStatus>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZReference = z.object({
  name: z.string(),
  status: z.custom<ReferenceStatus>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TReferenceProps = z.infer<typeof ZReferenceProps>
export interface IReference extends z.infer<typeof ZReference> {}
