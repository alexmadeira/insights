import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import z from 'zod'

export const ZMemberCompanyProps = z.object({
  memberId: z.custom<UniqueEntityID>(),
  companyId: z.custom<UniqueEntityID>(),
})

export const ZMemberCompany = z.object({
  memberId: z.custom<UniqueEntityID>(),
  companyId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TMemberCompanyProps = z.infer<typeof ZMemberCompanyProps>
export interface IMemberCompany extends z.infer<typeof ZMemberCompany> {}
