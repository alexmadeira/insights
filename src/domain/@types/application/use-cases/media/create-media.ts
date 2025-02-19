import type { Either } from '_COR/either'
import type { InvalidTypeError } from '_DOM/application/use-cases/_errors/invalid-type-error'
import type { Media } from '_DOM/enterprise/entities/media'

import z from 'zod'

export const ZCreateMediaUseCaseRequest = z.object({
  url: z.string(),
  typeCode: z.string(),
})

export const ZCreateMediaUseCaseResponse = z.custom<Either<InvalidTypeError, { media: Media }>>()

export const ZCreateMediaUseCase = z.object({
  execute: z.function(z.tuple([ZCreateMediaUseCaseRequest])).returns(z.promise(ZCreateMediaUseCaseResponse)),
})

//
//
//

export type TCreateMediaUseCaseRequest = z.infer<typeof ZCreateMediaUseCaseRequest>
export type TCreateMediaUseCaseResponse = z.infer<typeof ZCreateMediaUseCaseResponse>

export interface ICreateMediaUseCase extends z.infer<typeof ZCreateMediaUseCase> {}
