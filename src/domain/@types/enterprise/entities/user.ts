import type { Role, Slug } from '_DOMEnt/entities/value-objects'

import z from 'zod'

export const ZUserProps = z.object({
  name: z.string(),
  role: z.custom<Role>(),
  slug: z.custom<Slug>(),
  email: z.string().email(),
  team: z.string(),
  company: z.string(),
  avantar: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZUser = z.object({
  name: z.string(),
  role: z.custom<Role>(),
  slug: z.custom<Slug>(),
  email: z.string().email(),
  team: z.string(),
  company: z.string(),
  avantar: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TUserProps = z.infer<typeof ZUserProps>
export interface IUser extends z.infer<typeof ZUser> {}
