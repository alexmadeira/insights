import type { ReferenceStatus, Slug } from '_DOMEnt/entities/value-objects'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZReferenceProps = ZEntityProps.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  status: z.custom<ReferenceStatus>(),
  network: z.string(),
})

export const ZReference = ZEntity.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  status: z.custom<ReferenceStatus>(),
  network: z.string(),
})

//
//
//

export type TReferenceProps = z.infer<typeof ZReferenceProps>
export interface IReference extends z.infer<typeof ZReference> {}
