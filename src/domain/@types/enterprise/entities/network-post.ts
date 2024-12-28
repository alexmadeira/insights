import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZNetworkPostProps = ZEntityProps.extend({
  networkId: z.custom<UniqueEntityID>(),
  postId: z.custom<UniqueEntityID>(),
})

export const ZNetworkPost = ZEntity.extend({
  networkId: z.custom<UniqueEntityID>(),
  postId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TNetworkPostProps = z.infer<typeof ZNetworkPostProps>
export interface INetworkPost extends z.infer<typeof ZNetworkPost> {}
