import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZMemberAvatarProps = ZEntityProps.extend({
  memberId: z.custom<UniqueEntityID>(),
  avatarId: z.custom<UniqueEntityID>(),
})

export const ZMemberAvatar = ZEntity.extend({
  memberId: z.custom<UniqueEntityID>(),
  avatarId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TMemberAvatarProps = z.infer<typeof ZMemberAvatarProps>
export interface IMemberAvatar extends z.infer<typeof ZMemberAvatar> {}
