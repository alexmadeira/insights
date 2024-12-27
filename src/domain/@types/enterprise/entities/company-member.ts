import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { MemberRole } from '_DOMEnt/entities/value-objects/member-role'

import z from 'zod'

export const ZCompanyMemberProps = z.object({
  companyId: z.custom<UniqueEntityID>(),
  member: z.custom<MemberRole>(),
})

export const ZCompanyMember = z.object({
  companyId: z.custom<UniqueEntityID>(),
  member: z.custom<MemberRole>(),
})

//
//
//

export type TCompanyMemberProps = z.infer<typeof ZCompanyMemberProps>
export interface ICompanyMember extends z.infer<typeof ZCompanyMember> {}
