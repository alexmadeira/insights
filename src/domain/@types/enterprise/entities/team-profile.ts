import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZTeamProfileProps = ZEntityProps.extend({
  teamId: z.custom<UniqueEntityID>(),
  profileId: z.custom<UniqueEntityID>(),
})

export const ZTeamProfile = ZEntity.extend({
  teamId: z.custom<UniqueEntityID>(),
  profileId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TTeamProfileProps = z.infer<typeof ZTeamProfileProps>
export interface ITeamProfile extends z.infer<typeof ZTeamProfile> {}
