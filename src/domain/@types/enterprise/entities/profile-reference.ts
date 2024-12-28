import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZProfileReferenceProps = ZEntityProps.extend({
  profileId: z.custom<UniqueEntityID>(),
  referenceId: z.custom<UniqueEntityID>(),
})

export const ZProfileReference = ZEntity.extend({
  profileId: z.custom<UniqueEntityID>(),
  referenceId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TProfileReferenceProps = z.infer<typeof ZProfileReferenceProps>
export interface IProfileReference extends z.infer<typeof ZProfileReference> {}
