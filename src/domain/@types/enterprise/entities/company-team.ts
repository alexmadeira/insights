import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZCompanyTeamProps = ZEntityProps.extend({
  companyId: z.custom<UniqueEntityID>(),
  teamId: z.custom<UniqueEntityID>(),
})

export const ZCompanyTeam = ZEntity.extend({
  companyId: z.custom<UniqueEntityID>(),
  teamId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TCompanyTeamProps = z.infer<typeof ZCompanyTeamProps>
export interface ICompanyTeam extends z.infer<typeof ZCompanyTeam> {}
