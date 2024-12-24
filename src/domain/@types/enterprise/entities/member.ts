import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { MemberAvatar } from '_DOMEnt/entities/member-avatar'
import type { MemberTeamList } from '_DOMEnt/entities/member-team-list'
import type { Role, Slug } from '_DOMEnt/entities/value-objects'

import z from 'zod'

export const ZMemberProps = z.object({
  name: z.string(),
  role: z.custom<Role>(),
  slug: z.custom<Slug>(),
  email: z.string().email(),
  teams: z.custom<MemberTeamList>(),
  company: z.custom<UniqueEntityID>(),
  avatar: z.custom<MemberAvatar>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZMember = z.object({
  name: z.string(),
  role: z.custom<Role>(),
  slug: z.custom<Slug>(),
  email: z.string().email(),
  teams: z.custom<MemberTeamList>(),
  company: z.custom<UniqueEntityID>(),
  avatar: z.custom<MemberAvatar>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//
export type TMemberProps = z.infer<typeof ZMemberProps>
export interface IMember extends z.infer<typeof ZMember> {}
