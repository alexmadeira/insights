import type { MemberAvatarList } from '_DOM/enterprise/entities/member-avatar-list'
import type { MemberCompanyList } from '_DOM/enterprise/entities/member-company-list'
import type { MemberTeamList } from '_DOM/enterprise/entities/member-team-list'
import type { Slug } from '_DOM/enterprise/entities/value-objects'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZMemberProps = ZEntityProps.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  email: z.string().email(),
  teams: z.custom<MemberTeamList>(),
  avatars: z.custom<MemberAvatarList>(),
  companies: z.custom<MemberCompanyList>(),
})

export const ZMember = ZEntity.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  email: z.string().email(),
  teams: z.custom<MemberTeamList>(),
  avatars: z.custom<MemberAvatarList>(),
  companies: z.custom<MemberCompanyList>(),
})

//
//
//
export type TMemberProps = z.infer<typeof ZMemberProps>
export interface IMember extends z.infer<typeof ZMember> {}
