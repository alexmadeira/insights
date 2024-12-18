import type { ITeamRepository } from '@DOMTypes/application/repositories/team-repository'
import type {
  IDeleteTeamUseCase,
  TDeleteTeamUseCaseRequest,
  TDeleteTeamUseCaseResponse,
} from '@DOMTypes/application/use-cases/team/delete-team'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

export class DeleteTeamUseCase implements IDeleteTeamUseCase {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async execute({ teamId }: TDeleteTeamUseCaseRequest): Promise<TDeleteTeamUseCaseResponse> {
    const team = await this.teamRepository.findById(teamId)

    if (!team) {
      return left(new ResourceNotFoundError())
    }

    await this.teamRepository.delete(team)

    return right(null)
  }
}