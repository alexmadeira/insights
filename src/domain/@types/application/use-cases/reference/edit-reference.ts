import type { Either } from '_COR/either'
import type { InvalidReferenceStatusError } from '_DOM/application/use-cases/_errors/invalid-reference-status-error'
import type { ResourceNotFoundError } from '_DOM/application/use-cases/_errors/resource-not-found-error'
import type { Reference } from '_DOM/enterprise/entities/reference'

import z from 'zod'

export const ZEditReferenceUseCaseRequest = z.object({
  referenceId: z.string(),
  name: z.string(),
  statusCode: z.string(),
  networkId: z.string(),
})

export const ZEditReferenceUseCaseResponse =
  z.custom<Either<InvalidReferenceStatusError | ResourceNotFoundError, { reference: Reference }>>()

export const ZEditReferenceUseCase = z.object({
  execute: z.function(z.tuple([ZEditReferenceUseCaseRequest])).returns(z.promise(ZEditReferenceUseCaseResponse)),
})

//
//
//

export type TEditReferenceUseCaseRequest = z.infer<typeof ZEditReferenceUseCaseRequest>
export type TEditReferenceUseCaseResponse = z.infer<typeof ZEditReferenceUseCaseResponse>

export interface IEditReferenceUseCase extends z.infer<typeof ZEditReferenceUseCase> {}
