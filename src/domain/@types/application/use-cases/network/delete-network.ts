import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOM/application/use-cases/_errors/resource-not-found-error'

import z from 'zod'

export const ZDeleteNetworkUseCaseRequest = z.object({
  networkId: z.string(),
})

export const ZDeleteNetworkUseCaseResponse = z.custom<Either<ResourceNotFoundError, null>>()

export const ZDeleteNetworkUseCase = z.object({
  execute: z.function(z.tuple([ZDeleteNetworkUseCaseRequest])).returns(z.promise(ZDeleteNetworkUseCaseResponse)),
})

//
//
//

export type TDeleteNetworkUseCaseRequest = z.infer<typeof ZDeleteNetworkUseCaseRequest>
export type TDeleteNetworkUseCaseResponse = z.infer<typeof ZDeleteNetworkUseCaseResponse>

export interface IDeleteNetworkUseCase extends z.infer<typeof ZDeleteNetworkUseCase> {}
