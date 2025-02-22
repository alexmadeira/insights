import type { Either } from '_COR/either'
import type { InvalidReferenceStatusError } from '_DOM/application/use-cases/_errors/invalid-reference-status-error'
import type { Reference } from '_DOM/enterprise/entities/reference'

import z from 'zod'

export const ZCreateReferenceUseCaseRequest = z.object({
  name: z.string(),
  networkId: z.string(),
  statusCode: z.string().optional(),
})

export const ZCreateReferenceUseCaseResponse = z.custom<Either<InvalidReferenceStatusError, { reference: Reference }>>()

export const ZCreateReferenceUseCase = z.object({
  execute: z.function(z.tuple([ZCreateReferenceUseCaseRequest])).returns(z.promise(ZCreateReferenceUseCaseResponse)),
})

//
//
//

export type TCreateReferenceUseCaseRequest = z.infer<typeof ZCreateReferenceUseCaseRequest>
export type TCreateReferenceUseCaseResponse = z.infer<typeof ZCreateReferenceUseCaseResponse>

export interface ICreateReferenceUseCase extends z.infer<typeof ZCreateReferenceUseCase> {}
