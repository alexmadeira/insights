import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { ZERole } from '@DOMTypes/enums/role'
import z from 'zod'

export const ZCompanyMemberRoleProps = z.object({
  companyId: z.custom<UniqueEntityID>(),
  memberId: z.custom<UniqueEntityID>(),
  role: ZERole,
})

export const ZCompanyMemberRole = z.object({
  companyId: z.custom<UniqueEntityID>(),
  memberId: z.custom<UniqueEntityID>(),
  role: ZERole,
})

//
//
//

export type TCompanyMemberRoleProps = z.infer<typeof ZCompanyMemberRoleProps>
export interface ICompanyMemberRole extends z.infer<typeof ZCompanyMemberRole> {}
