import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZMemberCompanyProps = ZEntityProps.extend({
  memberId: z.custom<UniqueEntityID>(),
  companyId: z.custom<UniqueEntityID>(),
})

export const ZMemberCompany = ZEntity.extend({
  memberId: z.custom<UniqueEntityID>(),
  companyId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TMemberCompanyProps = z.infer<typeof ZMemberCompanyProps>
export interface IMemberCompany extends z.infer<typeof ZMemberCompany> {}
