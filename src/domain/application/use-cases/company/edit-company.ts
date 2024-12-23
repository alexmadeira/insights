import type { CompanyRepository } from '_DOMApp/repositories/company-repository'
import type { CompanyTeamRepository } from '_DOMApp/repositories/company-team-repository'
import type {
  IEditCompanyUseCase,
  TEditCompanyUseCaseRequest,
  TEditCompanyUseCaseResponse,
} from '@DOMTypes/application/use-cases/company/edit-company'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { CompanyTeam } from '_DOMEnt/entities/company-team'
import { CompanyTeamList } from '_DOMEnt/entities/company-team-list'

export class EditCompanyUseCase implements IEditCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly companyTeamRepository: CompanyTeamRepository,
  ) {}

  async execute({
    companyId,
    name,
    ownerId,
    avatarUrl,
    teamsIds,
    membersIds,
    profilesIds,
  }: TEditCompanyUseCaseRequest): Promise<TEditCompanyUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)
    if (!company) return left(new ResourceNotFoundError())

    const teams = await this.companyTeamRepository.findManyByCompanyId(companyId)
    const companyTeamList = new CompanyTeamList(teams)

    companyTeamList.update(
      teamsIds.map((teamId) => {
        return CompanyTeam.create({
          companyId: company.id,
          teamId: new UniqueEntityID(teamId),
        })
      }),
    )

    company.name = name
    company.teams = companyTeamList
    company.owner = new UniqueEntityID(ownerId)

    company.members = membersIds
    company.profiles = profilesIds

    company.avatar.url = avatarUrl

    await this.companyRepository.save(company)

    return right({ company })
  }
}
