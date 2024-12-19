import type { Acronym } from '_DOMEnt/entities/value-objects'

import z from 'zod'

export const ZAvatarProps = z.object({
  name: z.string(),
  url: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZAvatar = z.object({
  name: z.string(),
  url: z.string().nullable(),
  acronym: z.custom<Acronym>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TAvatarProps = z.infer<typeof ZAvatarProps>
export interface IAvatar extends z.infer<typeof ZAvatar> {}
