import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import z from 'zod'

export const ZCompanyMemberProps = z.object({
  companyId: z.custom<UniqueEntityID>(),
  memberId: z.custom<UniqueEntityID>(),
})

export const ZCompanyMember = z.object({
  companyId: z.custom<UniqueEntityID>(),
  memberId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TCompanyMemberProps = z.infer<typeof ZCompanyMemberProps>
export interface ICompanyMember extends z.infer<typeof ZCompanyMember> {}
