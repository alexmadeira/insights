import type { Either } from '_COR/either'
import type { UserAvatar } from '_DOMEnt/entities/user-avatar'

import z from 'zod'

export const ZCreateUserAvatarUseCaseRequest = z.object({
  userId: z.string(),
  url: z.string().nullable(),
  name: z.string(),
})

export const ZCreateUserAvatarUseCaseResponse = z.custom<Either<null, { avatar: UserAvatar }>>()

export const ZCreateUserAvatarUseCase = z.object({
  execute: z.function(z.tuple([ZCreateUserAvatarUseCaseRequest])).returns(z.promise(ZCreateUserAvatarUseCaseResponse)),
})

//
//
//

export type TCreateUserAvatarUseCaseRequest = z.infer<typeof ZCreateUserAvatarUseCaseRequest>
export type TCreateUserAvatarUseCaseResponse = z.infer<typeof ZCreateUserAvatarUseCaseResponse>

export interface ICreateUserAvatarUseCase extends z.infer<typeof ZCreateUserAvatarUseCase> {}
