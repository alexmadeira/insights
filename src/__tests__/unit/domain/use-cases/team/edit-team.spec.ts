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

    sut = new EditTeamUseCase(inMemoryTeamRepository, inMemoryTeamAvatarRepository)
  })

  describe('Use case', () => {
    describe('Team', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          await inMemoryTeamRepository.create(makeTeam({}, new UniqueEntityID('team-1')))

          const result = await sut.execute({
            teamId: 'team-1',
            name: 'Team Name',
            companyId: 'company-1',
            membersIds: ['member-1'],
            avatarsIds: ['avatar-1'],
            profilesIds: ['profile-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryTeamRepository.itens[0].name).toEqual('Team Name')
            expect(inMemoryTeamRepository.itens[0].company).toEqual('company-1')
            expect(inMemoryTeamRepository.itens[0].members).toEqual(['member-1'])
            expect(inMemoryTeamRepository.itens[0].profiles).toEqual(['profile-1'])

            expect(inMemoryTeamRepository.itens[0].avatars.currentItems).toHaveLength(1)
            expect(inMemoryTeamRepository.itens[0].avatars.currentItems).toEqual([
              expect.objectContaining({ teamId: result.value.team.id, avatarId: new UniqueEntityID('avatar-1') }),
            ])
          }
        })
        it("should't be able if not found", async () => {
          await inMemoryTeamRepository.create(makeTeam({}, new UniqueEntityID('team-1')))

          const result = await sut.execute({
            teamId: 'team-2',
            name: 'Team Name',
            companyId: 'company-1',
            membersIds: [],
            avatarsIds: [],
            profilesIds: [],
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
