import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOM/application/use-cases/_errors/resource-not-found-error'

import z from 'zod'

export const ZDeleteAvatarUseCaseRequest = z.object({
  avatarId: z.string(),
})

export const ZDeleteAvatarUseCaseResponse = z.custom<Either<ResourceNotFoundError, null>>()

export const ZDeleteAvatarUseCase = z.object({
  execute: z.function(z.tuple([ZDeleteAvatarUseCaseRequest])).returns(z.promise(ZDeleteAvatarUseCaseResponse)),
})

//
//
//

export type TDeleteAvatarUseCaseRequest = z.infer<typeof ZDeleteAvatarUseCaseRequest>
export type TDeleteAvatarUseCaseResponse = z.infer<typeof ZDeleteAvatarUseCaseResponse>

export interface IDeleteAvatarUseCase extends z.infer<typeof ZDeleteAvatarUseCase> {}
