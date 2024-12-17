import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import type { Profile } from '_DOMEnt/entities/profile'

import z from 'zod'

export const ZEditProfileUseCaseRequest = z.object({
  profileId: z.string(),
  name: z.string(),
  networkId: z.string(),
  referencesIds: z.array(z.string()),
})

export const ZEditProfileUseCaseResponse = z.custom<Either<ResourceNotFoundError, { profile: Profile }>>()

export const ZEditProfileUseCase = z.object({
  execute: z.function(z.tuple([ZEditProfileUseCaseRequest])).returns(z.promise(ZEditProfileUseCaseResponse)),
})

//
//
//

export type TEditProfileUseCaseRequest = z.infer<typeof ZEditProfileUseCaseRequest>
export type TEditProfileUseCaseResponse = z.infer<typeof ZEditProfileUseCaseResponse>

export interface IEditProfileUseCase extends z.infer<typeof ZEditProfileUseCase> {}
