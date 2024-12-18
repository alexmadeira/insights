import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import z from 'zod'

export const ZUserTeamProps = z.object({
  userId: z.custom<UniqueEntityID>(),
  teamId: z.custom<UniqueEntityID>(),
})

export const ZUserTeam = z.object({
  userId: z.custom<UniqueEntityID>(),
  teamId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TUserTeamProps = z.infer<typeof ZUserTeamProps>
export interface IUserTeam extends z.infer<typeof ZUserTeam> {}
