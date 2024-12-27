import type { Slug } from '_DOMEnt/entities/value-objects'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZProfileProps = ZEntityProps.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  network: z.string(),
  references: z.array(z.string()),
})

export const ZProfile = ZEntity.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  network: z.string(),
  references: z.array(z.string()),
})

//
//
//

export type TProfileProps = z.infer<typeof ZProfileProps>
export interface IProfile extends z.infer<typeof ZProfile> {}
