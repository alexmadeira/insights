import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditTeamUseCase } from '_DOMApp/use-cases/team/edit-team'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeTeam } from '_TEST/utils/factories/make-team'
import { InMemoryTeamAvatarRepository } from '_TEST/utils/repositories/in-memory-team-avatar-repository'
import { InMemoryTeamRepository } from '_TEST/utils/repositories/in-memory-team-repository'

let inMemoryTeamAvatarRepository: InMemoryTeamAvatarRepository
let inMemoryTeamRepository: InMemoryTeamRepository
let sut: EditTeamUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryTeamAvatarRepository = new InMemoryTeamAvatarRepository()
    inMemoryTeamRepository = new InMemoryTeamRepository(inMemoryTeamAvatarRepository)
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
            avatarUrl: 'http://team-avatar.com/image.png',
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryTeamRepository.itens[0].name).toEqual('Team Name')
            expect(inMemoryTeamRepository.itens[0].company).toEqual('company-1')
            expect(inMemoryTeamRepository.itens[0].members).toEqual(['member-1'])
            expect(inMemoryTeamRepository.itens[0].profiles).toEqual(['profile-1'])

            expect(inMemoryTeamAvatarRepository.itens[0].name).toEqual(result.value.team.avatar.name)
            expect(inMemoryTeamAvatarRepository.itens[0].acronym.value).toEqual(result.value.team.avatar.acronym.value)
            expect(inMemoryTeamAvatarRepository.itens[0].url).toEqual(result.value.team.avatar.url)
          }
        })
        it("should't be able if not found", async () => {
          await inMemoryTeamRepository.create(makeTeam({}, new UniqueEntityID('team-01')))

          const result = await sut.execute({
            teamId: 'team-02',
            name: 'Team Name',
            companyId: 'company-1',
            membersIds: [],
            profilesIds: [],
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
