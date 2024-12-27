import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZCompanyAvatarProps = ZEntityProps.extend({
  companyId: z.custom<UniqueEntityID>(),
  avatarId: z.custom<UniqueEntityID>(),
})

export const ZCompanyAvatar = ZEntity.extend({
  companyId: z.custom<UniqueEntityID>(),
  avatarId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TCompanyAvatarProps = z.infer<typeof ZCompanyAvatarProps>
export interface ICompanyAvatar extends z.infer<typeof ZCompanyAvatar> {}
