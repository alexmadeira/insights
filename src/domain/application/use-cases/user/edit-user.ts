import type { UserRepository } from '_DOMApp/repositories/user-repository'
import type { UserTeamRepository } from '_DOMApp/repositories/user-team-repository'
import type {
  IEditUserUseCase,
  TEditUserUseCaseRequest,
  TEditUserUseCaseResponse,
} from '@DOMTypes/application/use-cases/user/edit-user'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { UserTeam } from '_DOMEnt/entities/user-team'
import { UserTeamList } from '_DOMEnt/entities/user-team-list'
import { Role } from '_DOMEnt/entities/value-objects'

export class EditUserUseCase implements IEditUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userTeamRepository: UserTeamRepository,
  ) {}

  async execute({
    userId,
    name,
    email,
    teamsIds,
    companyId,
    role: roleCode,
  }: TEditUserUseCaseRequest): Promise<TEditUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) return left(new ResourceNotFoundError())

    const role = Role.create(roleCode)
    if (!role.code) return left(new InvalidTypeError())

    const teams = await this.userTeamRepository.findManyByUserId(userId)
    const userTeamList = new UserTeamList(teams)

    userTeamList.update(
      teamsIds.map((teamId) => {
        return UserTeam.create({
          userId: user.id,
          teamId: new UniqueEntityID(teamId),
        })
      }),
    )

    user.role = role
    user.name = name
    user.email = email
    user.teams = userTeamList
    user.company = new UniqueEntityID(companyId)

    await this.userRepository.save(user)

    return right({ user })
  }
}
