import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import z from 'zod'

export const ZCompanyTeamProps = z.object({
  companyId: z.custom<UniqueEntityID>(),
  teamId: z.custom<UniqueEntityID>(),
})

export const ZCompanyTeam = z.object({
  companyId: z.custom<UniqueEntityID>(),
  teamId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TCompanyTeamProps = z.infer<typeof ZCompanyTeamProps>
export interface ICompanyTeam extends z.infer<typeof ZCompanyTeam> {}
