import type { NetworkPostList } from '_DOMEnt/entities/network-post-list'
import type { NetworkType } from '_DOMEnt/entities/value-objects/network-type'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZNetworkProps = ZEntityProps.extend({
  name: z.string(),
  avatar: z.string(),
  username: z.string(),
  type: z.custom<NetworkType>(),
  posts: z.custom<NetworkPostList>(),
})

export const ZNetwork = ZEntity.extend({
  name: z.string(),
  avatar: z.string(),
  username: z.string(),
  type: z.custom<NetworkType>(),
  posts: z.custom<NetworkPostList>(),
})

//
//
//

export type TNetworkProps = z.infer<typeof ZNetworkProps>
export interface INetwork extends z.infer<typeof ZNetwork> {}
