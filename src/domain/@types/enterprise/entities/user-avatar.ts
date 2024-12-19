import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import z from 'zod'

import { ZAvatar, ZAvatarProps } from './avatar'

export const ZUserAvatarProps = ZAvatarProps.extend({
  userId: z.custom<UniqueEntityID>(),
})

export const ZUserAvatar = ZAvatar.extend({
  userId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TUserAvatarProps = z.infer<typeof ZUserAvatarProps>
export interface IUserAvatar extends z.infer<typeof ZUserAvatar> {}
