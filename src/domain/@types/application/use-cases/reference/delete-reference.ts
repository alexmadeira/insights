import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'

import z from 'zod'

export const ZDeleteReferenceUseCaseRequest = z.object({
  referenceId: z.string(),
})

export const ZDeleteReferenceUseCaseResponse = z.custom<Either<ResourceNotFoundError, null>>()

export const ZDeleteReferenceUseCase = z.object({
  execute: z.function(z.tuple([ZDeleteReferenceUseCaseRequest])).returns(z.promise(ZDeleteReferenceUseCaseResponse)),
})

//
//
//

export type TDeleteReferenceUseCaseRequest = z.infer<typeof ZDeleteReferenceUseCaseRequest>
export type TDeleteReferenceUseCaseResponse = z.infer<typeof ZDeleteReferenceUseCaseResponse>

export interface IDeleteReferenceUseCase extends z.infer<typeof ZDeleteReferenceUseCase> {}
