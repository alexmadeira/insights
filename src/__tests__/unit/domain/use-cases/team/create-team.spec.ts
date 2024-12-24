import { CreateTeamUseCase } from '_DOMApp/use-cases/team/create-team'
import { InMemoryTeamAvatarRepository } from '_TEST/utils/repositories/in-memory-team-avatar-repository'
import { InMemoryTeamRepository } from '_TEST/utils/repositories/in-memory-team-repository'

let inMemoryTeamAvatarRepository: InMemoryTeamAvatarRepository
let inMemoryTeamRepository: InMemoryTeamRepository
let sut: CreateTeamUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryTeamAvatarRepository = new InMemoryTeamAvatarRepository()
    inMemoryTeamRepository = new InMemoryTeamRepository(inMemoryTeamAvatarRepository)
    sut = new CreateTeamUseCase(inMemoryTeamRepository)
  })

  describe('Use case', () => {
    describe('Team', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            name: 'Team Name',
            companyId: 'company-1',
            membersIds: ['member-1'],
            profilesIds: ['profile-1'],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryTeamRepository.itens[0].name).toEqual('Team Name')
          expect(inMemoryTeamRepository.itens[0].company).toEqual('company-1')
          expect(inMemoryTeamRepository.itens[0].members).toEqual(['member-1'])
          expect(inMemoryTeamRepository.itens[0].profiles).toEqual(['profile-1'])
          expect(inMemoryTeamRepository.itens[0].slug.value).toEqual('team-name')

          expect(inMemoryTeamRepository.itens[0].avatar.name).toEqual('Team Name')
          expect(inMemoryTeamRepository.itens[0].avatar.acronym.value).toEqual('tn')
        })
        it('together should be able persist avatar', async () => {
          const result = await sut.execute({
            name: 'Team Name',
            companyId: 'company-1',
            membersIds: ['member-1'],
            profilesIds: ['profile-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryTeamAvatarRepository.itens).toHaveLength(1)
            expect(inMemoryTeamAvatarRepository.itens[0]).toEqual(
              expect.objectContaining({
                name: 'Team Name',
                teamId: result.value.team.id,
              }),
            )
          }
        })
      })
    })
  })
})
