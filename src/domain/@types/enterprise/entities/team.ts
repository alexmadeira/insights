import type { TeamAvatar } from '_DOMEnt/entities/team-avatar'
import type { Slug } from '_DOMEnt/entities/value-objects'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZTeamProps = ZEntityProps.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  company: z.string(),
  members: z.array(z.string()),
  profiles: z.array(z.string()),
  avatar: z.custom<TeamAvatar>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZTeam = ZEntity.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  company: z.string(),
  members: z.array(z.string()),
  profiles: z.array(z.string()),
  avatar: z.custom<TeamAvatar>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TTeamProps = z.infer<typeof ZTeamProps>
export interface ITeam extends z.infer<typeof ZTeam> {}
