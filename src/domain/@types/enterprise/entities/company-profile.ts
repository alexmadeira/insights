import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZCompanyProfileProps = ZEntityProps.extend({
  companyId: z.custom<UniqueEntityID>(),
  profileId: z.custom<UniqueEntityID>(),
})

export const ZCompanyProfile = ZEntity.extend({
  companyId: z.custom<UniqueEntityID>(),
  profileId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TCompanyProfileProps = z.infer<typeof ZCompanyProfileProps>
export interface ICompanyProfile extends z.infer<typeof ZCompanyProfile> {}
