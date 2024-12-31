import type { Either } from '_COR/either'
import type { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import type { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import type { Reference } from '_DOMEnt/entities/reference'

import z from 'zod'

export const ZEditReferenceUseCaseRequest = z.object({
  referenceId: z.string(),
  name: z.string(),
  statusCode: z.string(),
  networkId: z.string(),
})

export const ZEditReferenceUseCaseResponse =
  z.custom<Either<InvalidTypeError | ResourceNotFoundError, { reference: Reference }>>()

export const ZEditReferenceUseCase = z.object({
  execute: z.function(z.tuple([ZEditReferenceUseCaseRequest])).returns(z.promise(ZEditReferenceUseCaseResponse)),
})

//
//
//

export type TEditReferenceUseCaseRequest = z.infer<typeof ZEditReferenceUseCaseRequest>
export type TEditReferenceUseCaseResponse = z.infer<typeof ZEditReferenceUseCaseResponse>

export interface IEditReferenceUseCase extends z.infer<typeof ZEditReferenceUseCase> {}
