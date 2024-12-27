import { UniqueEntityID } from '_COR/entities/unique-entity-id'
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
            avatarsIds: ['avatar-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryTeamRepository.itens[0].name).toEqual('Team Name')
            expect(inMemoryTeamRepository.itens[0].slug.value).toEqual('team-name')
            expect(inMemoryTeamRepository.itens[0].company.toString()).toEqual('company-1')

            expect(inMemoryTeamRepository.itens[0].avatars.currentItems).toHaveLength(1)
            expect(inMemoryTeamRepository.itens[0].avatars.currentItems).toEqual([
              expect.objectContaining({
                teamId: result.value.team.id,
                avatarId: new UniqueEntityID('avatar-1'),
              }),
            ])

            expect(inMemoryTeamRepository.itens[0].members).toEqual(['member-1'])
            expect(inMemoryTeamRepository.itens[0].profiles).toEqual(['profile-1'])
          }
        })
        it('together should be able persist avatar', async () => {
          const result = await sut.execute({
            name: 'Team Name',
            companyId: 'company-1',
            membersIds: [],
            profilesIds: [],
            avatarsIds: ['avatar-1', 'avatar-2'],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryTeamAvatarRepository.itens).toHaveLength(2)
          expect(inMemoryTeamAvatarRepository.itens).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                avatarId: new UniqueEntityID('avatar-1'),
              }),
              expect.objectContaining({
                avatarId: new UniqueEntityID('avatar-2'),
              }),
            ]),
          )
        })
      })
    })
  })
})
