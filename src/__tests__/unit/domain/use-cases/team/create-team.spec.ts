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
            membesIds: ['member-1'],
            profilesIds: ['profile-1'],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryTeamRepository.itens[0]).toEqual(result.value?.team)
          expect(inMemoryTeamRepository.itens[0].slug.value).toEqual('team-name')

          expect(inMemoryTeamRepository.itens[0].avatar.name).toEqual('Team Name')
          expect(inMemoryTeamRepository.itens[0].avatar.acronym.value).toEqual('tn')
        })
      })
    })
  })
})
