import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

import z from 'zod'

export const ZDeleteUserUseCaseRequest = z.object({
  userId: z.string(),
})

export const ZDeleteUserUseCaseResponse = z.custom<Either<ResourceNotFoundError, null>>()

export const ZDeleteUserUseCase = z.object({
  execute: z.function(z.tuple([ZDeleteUserUseCaseRequest])).returns(z.promise(ZDeleteUserUseCaseResponse)),
})

//
//
//

export type TDeleteUserUseCaseRequest = z.infer<typeof ZDeleteUserUseCaseRequest>
export type TDeleteUserUseCaseResponse = z.infer<typeof ZDeleteUserUseCaseResponse>

export interface IDeleteUserUseCase extends z.infer<typeof ZDeleteUserUseCase> {}
