import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TeamAvatarList } from '_DOMEnt/entities/team-avatar-list'
import type { Slug } from '_DOMEnt/entities/value-objects'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZTeamProps = ZEntityProps.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  avatars: z.custom<TeamAvatarList>(),
  company: z.custom<UniqueEntityID>(),
  members: z.array(z.string()),
  profiles: z.array(z.string()),
})

export const ZTeam = ZEntity.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  avatars: z.custom<TeamAvatarList>(),
  company: z.custom<UniqueEntityID>(),
  members: z.array(z.string()),
  profiles: z.array(z.string()),
})

//
//
//

export type TTeamProps = z.infer<typeof ZTeamProps>
export interface ITeam extends z.infer<typeof ZTeam> {}
