import type { Slug } from '_DOMEnt/entities/value-objects'

import z from 'zod'

export const ZProfileProps = z.object({
  name: z.string(),
  slug: z.custom<Slug>(),
  network: z.string(),
  references: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZProfile = z.object({
  name: z.string(),
  slug: z.custom<Slug>(),
  network: z.string(),
  references: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TProfileProps = z.infer<typeof ZProfileProps>
export interface IProfile extends z.infer<typeof ZProfile> {}
