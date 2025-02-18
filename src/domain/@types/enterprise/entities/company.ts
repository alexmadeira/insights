import type { CompanyAvatarList } from '_DOM/enterprise/entities/company-avatar-list'
import type { CompanyMemberList } from '_DOM/enterprise/entities/company-member-list'
import type { CompanyProfileList } from '_DOM/enterprise/entities/company-profile-list'
import type { CompanyTeamList } from '_DOM/enterprise/entities/company-team-list'
import type { Slug } from '_DOM/enterprise/entities/value-objects'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZCompanyProps = ZEntityProps.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  avatars: z.custom<CompanyAvatarList>(),
  teams: z.custom<CompanyTeamList>(),
  members: z.custom<CompanyMemberList>(),
  profiles: z.custom<CompanyProfileList>(),
})

export const ZCompany = ZEntity.extend({
  name: z.string(),
  slug: z.custom<Slug>(),
  teams: z.custom<CompanyTeamList>(),
  members: z.custom<CompanyMemberList>(),
  avatars: z.custom<CompanyAvatarList>(),
  profiles: z.custom<CompanyProfileList>(),
})

//
//
//

export type TCompanyProps = z.infer<typeof ZCompanyProps>
export interface ICompany extends z.infer<typeof ZCompany> {}
