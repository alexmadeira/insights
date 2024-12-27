import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZTeamAvatarProps = ZEntityProps.extend({
  teamId: z.custom<UniqueEntityID>(),
  avatarId: z.custom<UniqueEntityID>(),
})

export const ZTeamAvatar = ZEntity.extend({
  teamId: z.custom<UniqueEntityID>(),
  avatarId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TTeamAvatarProps = z.infer<typeof ZTeamAvatarProps>
export interface ITeamAvatar extends z.infer<typeof ZTeamAvatar> {}
