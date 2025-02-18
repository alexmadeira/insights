import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { PostMediaList } from '_DOM/enterprise/entities/post-media-list'
import type { PostStatus } from '_DOM/enterprise/entities/value-objects'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZPostProps = ZEntityProps.extend({
  title: z.string(),
  cover: z.string(),
  likes: z.number(),
  comments: z.number(),
  description: z.string(),
  scheduledDate: z.coerce.date(),
  deslikes: z.number().optional(),
  status: z.custom<PostStatus>(),
  medias: z.custom<PostMediaList>(),
  network: z.custom<UniqueEntityID>(),
})

export const ZPost = ZEntity.extend({
  title: z.string(),
  cover: z.string(),
  likes: z.number(),
  comments: z.number(),
  description: z.string(),
  scheduledDate: z.coerce.date(),
  deslikes: z.number().optional(),
  status: z.custom<PostStatus>(),
  medias: z.custom<PostMediaList>(),
  network: z.custom<UniqueEntityID>(),
})

//
//
//

export type TPostProps = z.infer<typeof ZPostProps>
export interface IPost extends z.infer<typeof ZPost> {}
