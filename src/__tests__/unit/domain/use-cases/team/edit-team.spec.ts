import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditTeamUseCase } from '_DOMApp/use-cases/team/edit-team'
import { makeTeam } from '_TEST/utils/factories/make-team'
import { InMemoryTeamRepository } from '_TEST/utils/repositories/in-memory-team-repository'

let inMemoryTeamRepository: InMemoryTeamRepository
let sut: EditTeamUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryTeamRepository = new InMemoryTeamRepository()
    sut = new EditTeamUseCase(inMemoryTeamRepository)
  })

  describe('Use case', () => {
    describe('Team', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          await inMemoryTeamRepository.create(makeTeam({}, new UniqueEntityID('team-01')))

          const result = await sut.execute({
            teamId: 'team-01',
            name: 'Team Name',
            companyId: 'company-1',
            membersIds: ['member-1'],
            profilesIds: ['profile-1'],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryTeamRepository.itens[0]).toMatchObject({
            name: 'Team Name',
            company: 'company-1',
            members: ['member-1'],
            profiles: ['profile-1'],
          })
        })
      })
    })
  })
})
