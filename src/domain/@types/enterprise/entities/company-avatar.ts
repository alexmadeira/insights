import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import z from 'zod'

import { ZAvatar, ZAvatarProps } from './avatar'

export const ZCompanyAvatarProps = ZAvatarProps.extend({
  companyId: z.custom<UniqueEntityID>().optional(),
})

export const ZCompanyAvatar = ZAvatar.extend({
  companyId: z.custom<UniqueEntityID>().optional(),
})

//
//
//

export type TCompanyAvatarProps = z.infer<typeof ZCompanyAvatarProps>
export interface ICompanyAvatar extends z.infer<typeof ZCompanyAvatar> {}
