import { Slug } from '_DOMEnt/entities/value-objects'
import z from 'zod'

export const ZTeamProps = z.object({
  name: z.string(),
  avantar: z.string(),
  slug: z.custom<Slug>(),
  company: z.array(z.string()),
  members: z.array(z.string()),
  profiles: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZTeam = z.object({
  name: z.string(),
  avantar: z.string(),
  slug: z.custom<Slug>(),
  company: z.array(z.string()),
  members: z.array(z.string()),
  profiles: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TTeamProps = z.infer<typeof ZTeamProps>
export interface ITeam extends z.infer<typeof ZTeam> {}
