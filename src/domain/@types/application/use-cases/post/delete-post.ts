import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOMApp/use-cases/_errors/resource-not-found-error'

import z from 'zod'

export const ZDeletePostUseCaseRequest = z.object({
  postId: z.string(),
})

export const ZDeletePostUseCaseResponse = z.custom<Either<ResourceNotFoundError, null>>()

export const ZDeletePostUseCase = z.object({
  execute: z.function(z.tuple([ZDeletePostUseCaseRequest])).returns(z.promise(ZDeletePostUseCaseResponse)),
})

//
//
//

export type TDeletePostUseCaseRequest = z.infer<typeof ZDeletePostUseCaseRequest>
export type TDeletePostUseCaseResponse = z.infer<typeof ZDeletePostUseCaseResponse>

export interface IDeletePostUseCase extends z.infer<typeof ZDeletePostUseCase> {}
