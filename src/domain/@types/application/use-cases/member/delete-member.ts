import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOM/application/use-cases/_errors/resource-not-found-error'

import z from 'zod'

export const ZDeleteMemberUseCaseRequest = z.object({
  memberId: z.string(),
})

export const ZDeleteMemberUseCaseResponse = z.custom<Either<ResourceNotFoundError, null>>()

export const ZDeleteMemberUseCase = z.object({
  execute: z.function(z.tuple([ZDeleteMemberUseCaseRequest])).returns(z.promise(ZDeleteMemberUseCaseResponse)),
})

//
//
//

export type TDeleteMemberUseCaseRequest = z.infer<typeof ZDeleteMemberUseCaseRequest>
export type TDeleteMemberUseCaseResponse = z.infer<typeof ZDeleteMemberUseCaseResponse>

export interface IDeleteMemberUseCase extends z.infer<typeof ZDeleteMemberUseCase> {}
