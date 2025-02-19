import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { ReferenceStatus, Slug } from '_DOM/enterprise/entities/value-objects'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZReferenceProps = ZEntityProps.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  status: z.custom<ReferenceStatus>(),
  network: z.custom<UniqueEntityID>(),
})

export const ZReference = ZEntity.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  status: z.custom<ReferenceStatus>(),
  network: z.custom<UniqueEntityID>(),
})

//
//
//

export type TReferenceProps = z.infer<typeof ZReferenceProps>
export interface IReference extends z.infer<typeof ZReference> {}
