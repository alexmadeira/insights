import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import type { UserAvatar } from '_DOMEnt/entities/user-avatar'

import z from 'zod'

export const ZEditUserAvatarUseCaseRequest = z.object({
  avatarId: z.string(),
  url: z.string().nullable(),
  name: z.string(),
})

export const ZEditUserAvatarUseCaseResponse = z.custom<Either<ResourceNotFoundError, { userAvatar: UserAvatar }>>()

export const ZEditUserAvatarUseCase = z.object({
  execute: z.function(z.tuple([ZEditUserAvatarUseCaseRequest])).returns(z.promise(ZEditUserAvatarUseCaseResponse)),
})

//
//
//

export type TEditUserAvatarUseCaseRequest = z.infer<typeof ZEditUserAvatarUseCaseRequest>
export type TEditUserAvatarUseCaseResponse = z.infer<typeof ZEditUserAvatarUseCaseResponse>

export interface IEditUserAvatarUseCase extends z.infer<typeof ZEditUserAvatarUseCase> {}
