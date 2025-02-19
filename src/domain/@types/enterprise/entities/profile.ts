import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Connection } from '_DOM/enterprise/entities/connection'
import type { ProfileReferenceList } from '_DOM/enterprise/entities/profile-reference-list'
import type { Slug } from '_DOM/enterprise/entities/value-objects'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZProfileProps = ZEntityProps.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  network: z.custom<UniqueEntityID>(),
  references: z.custom<ProfileReferenceList>(),
  connection: z.custom<Connection>(),
})

export const ZProfile = ZEntity.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  network: z.custom<UniqueEntityID>(),
  references: z.custom<ProfileReferenceList>(),
  connection: z.custom<Connection>(),
})

//
//
//

export type TProfileProps = z.infer<typeof ZProfileProps>
export interface IProfile extends z.infer<typeof ZProfile> {}
