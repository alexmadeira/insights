import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import z from 'zod'

import { ZAvatar, ZAvatarProps } from './avatar'

export const ZMemberAvatarProps = ZAvatarProps.extend({
  memberId: z.custom<UniqueEntityID>().optional(),
})

export const ZMemberAvatar = ZAvatar.extend({
  memberId: z.custom<UniqueEntityID>().optional(),
})

//
//
//

export type TMemberAvatarProps = z.infer<typeof ZMemberAvatarProps>
export interface IMemberAvatar extends z.infer<typeof ZMemberAvatar> {}
