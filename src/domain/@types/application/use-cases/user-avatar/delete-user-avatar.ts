import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

import z from 'zod'

export const ZDeleteUserAvatarUseCaseRequest = z.object({
  avatarId: z.string(),
})

export const ZDeleteUserAvatarUseCaseResponse = z.custom<Either<ResourceNotFoundError, null>>()

export const ZDeleteUserAvatarUseCase = z.object({
  execute: z.function(z.tuple([ZDeleteUserAvatarUseCaseRequest])).returns(z.promise(ZDeleteUserAvatarUseCaseResponse)),
})

//
//
//

export type TDeleteUserAvatarUseCaseRequest = z.infer<typeof ZDeleteUserAvatarUseCaseRequest>
export type TDeleteUserAvatarUseCaseResponse = z.infer<typeof ZDeleteUserAvatarUseCaseResponse>

export interface IDeleteUserAvatarUseCase extends z.infer<typeof ZDeleteUserAvatarUseCase> {}
