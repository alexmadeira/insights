import type { Acronym } from '_DOMEnt/entities/value-objects'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZAvatarProps = ZEntityProps.extend({
  name: z.string(),
  url: z.string().nullish(),
  isDefault: z.boolean(),
})

export const ZAvatar = ZEntity.extend({
  name: z.string(),
  url: z.string().nullish(),
  isDefault: z.boolean(),
  acronym: z.custom<Acronym>(),
})

//
//
//

export type TAvatarProps = z.infer<typeof ZAvatarProps>
export interface IAvatar extends z.infer<typeof ZAvatar> {}
