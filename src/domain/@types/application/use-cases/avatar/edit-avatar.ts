import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import type { Avatar } from '_DOMEnt/entities/avatar'

import z from 'zod'

export const ZEditAvatarUseCaseRequest = z.object({
  avatarId: z.string(),
  name: z.string(),
  isDefault: z.boolean(),
  url: z.string().nullish(),
})

export const ZEditAvatarUseCaseResponse = z.custom<Either<ResourceNotFoundError, { avatar: Avatar }>>()

export const ZEditAvatarUseCase = z.object({
  execute: z.function(z.tuple([ZEditAvatarUseCaseRequest])).returns(z.promise(ZEditAvatarUseCaseResponse)),
})

//
//
//

export type TEditAvatarUseCaseRequest = z.infer<typeof ZEditAvatarUseCaseRequest>
export type TEditAvatarUseCaseResponse = z.infer<typeof ZEditAvatarUseCaseResponse>

export interface IEditAvatarUseCase extends z.infer<typeof ZEditAvatarUseCase> {}
