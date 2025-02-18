import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TeamAvatarList } from '_DOM/enterprise/entities/team-avatar-list'
import type { TeamMemberList } from '_DOM/enterprise/entities/team-member-list'
import type { TeamProfileList } from '_DOM/enterprise/entities/team-profile-list'
import type { Slug } from '_DOM/enterprise/entities/value-objects'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZTeamProps = ZEntityProps.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  company: z.custom<UniqueEntityID>(),
  avatars: z.custom<TeamAvatarList>(),
  members: z.custom<TeamMemberList>(),
  profiles: z.custom<TeamProfileList>(),
})

export const ZTeam = ZEntity.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  avatars: z.custom<TeamAvatarList>(),
  company: z.custom<UniqueEntityID>(),
  members: z.custom<TeamMemberList>(),
  profiles: z.custom<TeamProfileList>(),
})

//
//
//

export type TTeamProps = z.infer<typeof ZTeamProps>
export interface ITeam extends z.infer<typeof ZTeam> {}
