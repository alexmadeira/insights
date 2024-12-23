import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import z from 'zod'

import { ZAvatar, ZAvatarProps } from './avatar'

export const ZTeamAvatarProps = ZAvatarProps.extend({
  teamId: z.custom<UniqueEntityID>().optional(),
})

export const ZTeamAvatar = ZAvatar.extend({
  teamId: z.custom<UniqueEntityID>().optional(),
})

//
//
//

export type TTeamAvatarProps = z.infer<typeof ZTeamAvatarProps>
export interface ITeamAvatar extends z.infer<typeof ZTeamAvatar> {}
