import type { Either } from '_COR/either'
import type { Profile } from '_DOMEnt/entities/profile'

import z from 'zod'

export const ZCreateProfileUseCaseRequest = z.object({
  name: z.string(),
  networkId: z.string(),
  referencesIds: z.array(z.string()),
})

export const ZCreateProfileUseCaseResponse = z.custom<Either<null, { profile: Profile }>>()

export const ZCreateProfileUseCase = z.object({
  execute: z.function(z.tuple([ZCreateProfileUseCaseRequest])).returns(z.promise(ZCreateProfileUseCaseResponse)),
})

//
//
//

export type TCreateProfileUseCaseRequest = z.infer<typeof ZCreateProfileUseCaseRequest>
export type TCreateProfileUseCaseResponse = z.infer<typeof ZCreateProfileUseCaseResponse>

export interface ICreateProfileUseCase extends z.infer<typeof ZCreateProfileUseCase> {}
