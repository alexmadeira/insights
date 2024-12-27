import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZMemberTeamProps = ZEntityProps.extend({
  memberId: z.custom<UniqueEntityID>(),
  teamId: z.custom<UniqueEntityID>(),
})

export const ZMemberTeam = ZEntity.extend({
  memberId: z.custom<UniqueEntityID>(),
  teamId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TMemberTeamProps = z.infer<typeof ZMemberTeamProps>
export interface IMemberTeam extends z.infer<typeof ZMemberTeam> {}
