import type { MediaType } from '_DOMEnt/entities/value-objects'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZMediaProps = ZEntityProps.extend({
  url: z.string().url(),

  type: z.custom<MediaType>(),
})

export const ZMedia = ZEntity.extend({
  url: z.string().url(),
  type: z.custom<MediaType>(),
})

//
//
//

export type TMediaProps = z.infer<typeof ZMediaProps>
export interface IMedia extends z.infer<typeof ZMedia> {}
