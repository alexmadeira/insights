import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import z from 'zod'

export const ZCompanyProfileProps = z.object({
  companyId: z.custom<UniqueEntityID>(),
  profileId: z.custom<UniqueEntityID>(),
})

export const ZCompanyProfile = z.object({
  companyId: z.custom<UniqueEntityID>(),
  profileId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TCompanyProfileProps = z.infer<typeof ZCompanyProfileProps>
export interface ICompanyProfile extends z.infer<typeof ZCompanyProfile> {}
