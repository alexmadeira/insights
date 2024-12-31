import type { Either } from '_COR/either'
import type { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import type { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import type { Media } from '_DOMEnt/entities/media'

import z from 'zod'

export const ZEditMediaUseCaseRequest = z.object({
  mediaId: z.string(),
  url: z.string(),
  typeCode: z.string(),
})

export const ZEditMediaUseCaseResponse = z.custom<Either<InvalidTypeError | ResourceNotFoundError, { media: Media }>>()

export const ZEditMediaUseCase = z.object({
  execute: z.function(z.tuple([ZEditMediaUseCaseRequest])).returns(z.promise(ZEditMediaUseCaseResponse)),
})

//
//
//

export type TEditMediaUseCaseRequest = z.infer<typeof ZEditMediaUseCaseRequest>
export type TEditMediaUseCaseResponse = z.infer<typeof ZEditMediaUseCaseResponse>

export interface IEditMediaUseCase extends z.infer<typeof ZEditMediaUseCase> {}
