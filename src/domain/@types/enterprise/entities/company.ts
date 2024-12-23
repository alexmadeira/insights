import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { CompanyAvatar } from '_DOMEnt/entities/company-avatar'
import type { Slug } from '_DOMEnt/entities/value-objects'

import { CompanyTeamList } from '_DOMEnt/entities/company-team-list'
import z from 'zod'

export const ZCompanyProps = z.object({
  name: z.string(),
  slug: z.custom<Slug>(),
  teams: z.custom<CompanyTeamList>(),
  members: z.array(z.string()),
  profiles: z.array(z.string()),
  owner: z.custom<UniqueEntityID>(),
  avatar: z.custom<CompanyAvatar>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZCompany = z.object({
  name: z.string(),
  slug: z.custom<Slug>(),
  teams: z.custom<CompanyTeamList>(),
  members: z.array(z.string()),
  profiles: z.array(z.string()),
  owner: z.custom<UniqueEntityID>(),
  avatar: z.custom<CompanyAvatar>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TCompanyProps = z.infer<typeof ZCompanyProps>
export interface ICompany extends z.infer<typeof ZCompany> {}
