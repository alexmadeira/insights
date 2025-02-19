import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOM/application/use-cases/_errors/resource-not-found-error'

import z from 'zod'

export const ZDeleteTeamUseCaseRequest = z.object({
  teamId: z.string(),
})

export const ZDeleteTeamUseCaseResponse = z.custom<Either<ResourceNotFoundError, null>>()

export const ZDeleteTeamUseCase = z.object({
  execute: z.function(z.tuple([ZDeleteTeamUseCaseRequest])).returns(z.promise(ZDeleteTeamUseCaseResponse)),
})

//
//
//

export type TDeleteTeamUseCaseRequest = z.infer<typeof ZDeleteTeamUseCaseRequest>
export type TDeleteTeamUseCaseResponse = z.infer<typeof ZDeleteTeamUseCaseResponse>

export interface IDeleteTeamUseCase extends z.infer<typeof ZDeleteTeamUseCase> {}
