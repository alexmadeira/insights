import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { MemberRole } from '_DOMEnt/entities/value-objects/member-role'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZCompanyMemberProps = ZEntityProps.extend({
  companyId: z.custom<UniqueEntityID>(),
  member: z.custom<MemberRole>(),
})

export const ZCompanyMember = ZEntity.extend({
  companyId: z.custom<UniqueEntityID>(),
  member: z.custom<MemberRole>(),
})

//
//
//

export type TCompanyMemberProps = z.infer<typeof ZCompanyMemberProps>
export interface ICompanyMember extends z.infer<typeof ZCompanyMember> {}
