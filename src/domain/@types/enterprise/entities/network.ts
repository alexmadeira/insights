import z from 'zod'

export const ZNetworkProps = z.object({
  name: z.string(),
  username: z.string(),
  type: z.string(),
  posts: z.array(z.string()),
  avantar: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZNetwork = z.object({
  name: z.string(),
  username: z.string(),
  type: z.string(),
  avatar: z.string(),
  posts: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TNetworkProps = z.infer<typeof ZNetworkProps>
export interface INetwork extends z.infer<typeof ZNetwork> {}
