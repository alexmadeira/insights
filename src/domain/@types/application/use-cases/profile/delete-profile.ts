import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'

import z from 'zod'

export const ZDeleteProfileUseCaseRequest = z.object({
  profileId: z.string(),
})

export const ZDeleteProfileUseCaseResponse = z.custom<Either<ResourceNotFoundError, null>>()

export const ZDeleteProfileUseCase = z.object({
  execute: z.function(z.tuple([ZDeleteProfileUseCaseRequest])).returns(z.promise(ZDeleteProfileUseCaseResponse)),
})

//
//
//

export type TDeleteProfileUseCaseRequest = z.infer<typeof ZDeleteProfileUseCaseRequest>
export type TDeleteProfileUseCaseResponse = z.infer<typeof ZDeleteProfileUseCaseResponse>

export interface IDeleteProfileUseCase extends z.infer<typeof ZDeleteProfileUseCase> {}
