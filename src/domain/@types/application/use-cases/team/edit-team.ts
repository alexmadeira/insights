import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'
import type { Team } from '_DOMEnt/entities/team'

import z from 'zod'

export const ZEditTeamUseCaseRequest = z.object({
  teamId: z.string(),
  name: z.string(),
  avatarsIds: z.array(z.string()),
  membersIds: z.array(z.string()),
  profilesIds: z.array(z.string()),
})

export const ZEditTeamUseCaseResponse = z.custom<Either<ResourceNotFoundError, { team: Team }>>()

export const ZEditTeamUseCase = z.object({
  execute: z.function(z.tuple([ZEditTeamUseCaseRequest])).returns(z.promise(ZEditTeamUseCaseResponse)),
})

//
//
//

export type TEditTeamUseCaseRequest = z.infer<typeof ZEditTeamUseCaseRequest>
export type TEditTeamUseCaseResponse = z.infer<typeof ZEditTeamUseCaseResponse>

export interface IEditTeamUseCase extends z.infer<typeof ZEditTeamUseCase> {}
