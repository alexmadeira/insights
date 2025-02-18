import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOM/application/use-cases/_errors/resource-not-found-error'

import z from 'zod'

export const ZDeleteMediaUseCaseRequest = z.object({
  mediaId: z.string(),
})

export const ZDeleteMediaUseCaseResponse = z.custom<Either<ResourceNotFoundError, null>>()

export const ZDeleteMediaUseCase = z.object({
  execute: z.function(z.tuple([ZDeleteMediaUseCaseRequest])).returns(z.promise(ZDeleteMediaUseCaseResponse)),
})

//
//
//

export type TDeleteMediaUseCaseRequest = z.infer<typeof ZDeleteMediaUseCaseRequest>
export type TDeleteMediaUseCaseResponse = z.infer<typeof ZDeleteMediaUseCaseResponse>

export interface IDeleteMediaUseCase extends z.infer<typeof ZDeleteMediaUseCase> {}
