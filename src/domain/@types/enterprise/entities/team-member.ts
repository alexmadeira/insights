import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZTeamMemberProps = ZEntityProps.extend({
  teamId: z.custom<UniqueEntityID>(),
  memberId: z.custom<UniqueEntityID>(),
})

export const ZTeamMember = ZEntity.extend({
  teamId: z.custom<UniqueEntityID>(),
  memberId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TTeamMemberProps = z.infer<typeof ZTeamMemberProps>
export interface ITeamMember extends z.infer<typeof ZTeamMember> {}
