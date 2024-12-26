import type { CompanyAvatar } from '_DOMEnt/entities/company-avatar'
import type { CompanyMemberList } from '_DOMEnt/entities/company-member-list'
import type { CompanyProfileList } from '_DOMEnt/entities/company-profile-list'
import type { CompanyTeamList } from '_DOMEnt/entities/company-team-list'
import type { Slug } from '_DOMEnt/entities/value-objects'

import z from 'zod'

export const ZCompanyProps = z.object({
  name: z.string(),
  slug: z.custom<Slug>(),
  teams: z.custom<CompanyTeamList>(),
  members: z.custom<CompanyMemberList>(),
  profiles: z.custom<CompanyProfileList>(),
  avatar: z.custom<CompanyAvatar>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZCompany = z.object({
  name: z.string(),
  slug: z.custom<Slug>(),
  teams: z.custom<CompanyTeamList>(),
  members: z.custom<CompanyMemberList>(),
  profiles: z.custom<CompanyProfileList>(),
  avatar: z.custom<CompanyAvatar>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TCompanyProps = z.infer<typeof ZCompanyProps>
export interface ICompany extends z.infer<typeof ZCompany> {}
