import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import z from 'zod'

export const ZCompanyAvatarProps = z.object({
  companyId: z.custom<UniqueEntityID>(),
  avatarId: z.custom<UniqueEntityID>(),
})

export const ZCompanyAvatar = z.object({
  companyId: z.custom<UniqueEntityID>(),
  avatarId: z.custom<UniqueEntityID>(),
})

//
//
//

export type TCompanyAvatarProps = z.infer<typeof ZCompanyAvatarProps>
export interface ICompanyAvatar extends z.infer<typeof ZCompanyAvatar> {}
