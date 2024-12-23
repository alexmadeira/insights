import type { Either } from '_COR/either'
import type { Team } from '_DOMEnt/entities/team'

import z from 'zod'

export const ZCreateTeamUseCaseRequest = z.object({
  name: z.string(),
  companyId: z.string(),
  membersIds: z.array(z.string()),
  profilesIds: z.array(z.string()),
})

export const ZCreateTeamUseCaseResponse = z.custom<Either<null, { team: Team }>>()

export const ZCreateTeamUseCase = z.object({
  execute: z.function(z.tuple([ZCreateTeamUseCaseRequest])).returns(z.promise(ZCreateTeamUseCaseResponse)),
})

//
//
//

export type TCreateTeamUseCaseRequest = z.infer<typeof ZCreateTeamUseCaseRequest>
export type TCreateTeamUseCaseResponse = z.infer<typeof ZCreateTeamUseCaseResponse>

export interface ICreateTeamUseCase extends z.infer<typeof ZCreateTeamUseCase> {}
