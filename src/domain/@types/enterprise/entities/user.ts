import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Avatar } from '_DOMEnt/entities/avatar'
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
  avantar: z.custom<Avatar>().optional(),
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
  avantar: z.custom<Avatar>().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TUserProps = z.infer<typeof ZUserProps>
export interface IUser extends z.infer<typeof ZUser> {}
