import { Slug } from '_DOMEnt/entities/value-objects'
import z from 'zod'

export const ZCompanyProps = z.object({
  name: z.string(),
  avantar: z.string(),
  slug: z.custom<Slug>(),
  teams: z.array(z.string()),
  members: z.array(z.string()),
  profiles: z.array(z.string()),
  owner: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZCompany = z.object({
  name: z.string(),
  avantar: z.string(),
  slug: z.custom<Slug>(),
  teams: z.array(z.string()),
  members: z.array(z.string()),
  profiles: z.array(z.string()),
  owner: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TCompanyProps = z.infer<typeof ZCompanyProps>
export interface ICompany extends z.infer<typeof ZCompany> {}
