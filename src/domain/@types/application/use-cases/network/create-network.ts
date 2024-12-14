import type { Either } from '_COR/either'
import type { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import type { Network } from '_DOMEnt/entities/network'

import z from 'zod'

export const ZCreateNetworkUseCaseRequest = z.object({
  name: z.string(),
  userName: z.string(),
  status: z.string().optional(),
})

export const ZCreateNetworkUseCaseResponse = z.custom<Either<InvalidTypeError, { network: Network }>>()

export const ZCreateNetworkUseCase = z.object({
  execute: z.function(z.tuple([ZCreateNetworkUseCaseRequest])).returns(z.promise(ZCreateNetworkUseCaseResponse)),
})

//
//
//

export type TCreateNetworkUseCaseRequest = z.infer<typeof ZCreateNetworkUseCaseRequest>
export type TCreateNetworkUseCaseResponse = z.infer<typeof ZCreateNetworkUseCaseResponse>

export interface ICreateNetworkUseCase extends z.infer<typeof ZCreateNetworkUseCase> {}
