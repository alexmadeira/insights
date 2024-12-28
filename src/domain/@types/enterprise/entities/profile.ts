import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Slug } from '_DOMEnt/entities/value-objects'

import { ProfileReferenceList } from '_DOMEnt/entities/profile-reference-list'
import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZProfileProps = ZEntityProps.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  network: z.custom<UniqueEntityID>(),
  references: z.custom<ProfileReferenceList>(),
})

export const ZProfile = ZEntity.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  network: z.custom<UniqueEntityID>(),
  references: z.custom<ProfileReferenceList>(),
})

//
//
//

export type TProfileProps = z.infer<typeof ZProfileProps>
export interface IProfile extends z.infer<typeof ZProfile> {}
