import type { Either } from '_COR/either'
import type { Avatar } from '_DOMEnt/entities/avatar'

import z from 'zod'

export const ZCreateAvatarUseCaseRequest = z.object({
  name: z.string(),
  url: z.string().nullish(),
})

export const ZCreateAvatarUseCaseResponse = z.custom<Either<null, { avatar: Avatar }>>()

export const ZCreateAvatarUseCase = z.object({
  execute: z.function(z.tuple([ZCreateAvatarUseCaseRequest])).returns(z.promise(ZCreateAvatarUseCaseResponse)),
})

//
//
//

export type TCreateAvatarUseCaseRequest = z.infer<typeof ZCreateAvatarUseCaseRequest>
export type TCreateAvatarUseCaseResponse = z.infer<typeof ZCreateAvatarUseCaseResponse>

export interface ICreateAvatarUseCase extends z.infer<typeof ZCreateAvatarUseCase> {}
