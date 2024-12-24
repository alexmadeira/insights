import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import z from 'zod'

export const ZMemberTeamProps = z.object({
  memberId: z.custom<UniqueEntityID>(),
  teamId: z.custom<UniqueEntityID>(),
})

export const ZMemberTeam = z.object({
  memberId: z.custom<UniqueEntityID>(),
  teamId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TMemberTeamProps = z.infer<typeof ZMemberTeamProps>
export interface IMemberTeam extends z.infer<typeof ZMemberTeam> {}
