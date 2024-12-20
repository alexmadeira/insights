import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { UserAvatar } from '_DOMEnt/entities/user-avatar'
import type { UserTeamList } from '_DOMEnt/entities/user-team-list'
import type { Role, Slug } from '_DOMEnt/entities/value-objects'

import z from 'zod'

export const ZUserProps = z.object({
  name: z.string(),
  role: z.custom<Role>(),
  slug: z.custom<Slug>(),
  email: z.string().email(),
  teams: z.custom<UserTeamList>(),
  company: z.custom<UniqueEntityID>(),
  avantar: z.custom<UserAvatar>().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZUser = z.object({
  name: z.string(),
  role: z.custom<Role>(),
  slug: z.custom<Slug>(),
  email: z.string().email(),
  teams: z.custom<UserTeamList>(),
  company: z.custom<UniqueEntityID>(),
  avantar: z.custom<UserAvatar>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  removeAvantar: z.function().returns(z.void()),
})

//
//
//

export type TUserProps = z.infer<typeof ZUserProps>
export interface IUser extends z.infer<typeof ZUser> {}
