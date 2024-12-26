import type { MemberAvatar } from '_DOMEnt/entities/member-avatar'
import type { MemberCompanyList } from '_DOMEnt/entities/member-company-list'
import type { MemberTeamList } from '_DOMEnt/entities/member-team-list'
import type { Slug } from '_DOMEnt/entities/value-objects'

import z from 'zod'

export const ZMemberProps = z.object({
  name: z.string(),
  slug: z.custom<Slug>(),
  email: z.string().email(),
  teams: z.custom<MemberTeamList>(),
  companies: z.custom<MemberCompanyList>(),
  avatar: z.custom<MemberAvatar>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZMember = z.object({
  name: z.string(),
  slug: z.custom<Slug>(),
  email: z.string().email(),
  teams: z.custom<MemberTeamList>(),
  companies: z.custom<MemberCompanyList>(),
  avatar: z.custom<MemberAvatar>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//
export type TMemberProps = z.infer<typeof ZMemberProps>
export interface IMember extends z.infer<typeof ZMember> {}
