import type { MemberAvatarList } from '_DOMEnt/entities/member-avatar-list'
import type { MemberCompanyList } from '_DOMEnt/entities/member-company-list'
import type { MemberTeamList } from '_DOMEnt/entities/member-team-list'
import type { Slug } from '_DOMEnt/entities/value-objects'

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
