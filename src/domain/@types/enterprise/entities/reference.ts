import type { ReferenceStatus, Slug } from '_DOMEnt/entities/value-objects'

import z from 'zod'

export const ZReferenceProps = z.object({
  name: z.string(),
  slug: z.custom<Slug>(),
  status: z.custom<ReferenceStatus>(),
  network: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZReference = z.object({
  name: z.string(),
  slug: z.custom<Slug>(),
  status: z.custom<ReferenceStatus>(),
  network: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TReferenceProps = z.infer<typeof ZReferenceProps>
export interface IReference extends z.infer<typeof ZReference> {}
