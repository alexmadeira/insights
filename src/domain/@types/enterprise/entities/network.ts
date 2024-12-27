import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZNetworkProps = ZEntityProps.extend({
  name: z.string(),
  username: z.string(),
  type: z.string(),
  posts: z.array(z.string()),
  avantar: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZNetwork = ZEntity.extend({
  name: z.string(),
  username: z.string(),
  type: z.string(),
  posts: z.array(z.string()),
  avantar: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TNetworkProps = z.infer<typeof ZNetworkProps>
export interface INetwork extends z.infer<typeof ZNetwork> {}
