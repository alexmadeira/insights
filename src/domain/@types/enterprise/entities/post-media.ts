import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZPostMediaProps = ZEntityProps.extend({
  postId: z.custom<UniqueEntityID>(),
  mediaId: z.custom<UniqueEntityID>(),
})

export const ZPostMedia = ZEntity.extend({
  postId: z.custom<UniqueEntityID>(),
  mediaId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TPostMediaProps = z.infer<typeof ZPostMediaProps>
export interface IPostMedia extends z.infer<typeof ZPostMedia> {}
