import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CreateTeamUseCase } from '_DOM/application/use-cases/team/create-team'
import { InMemoryTeamAvatarRepository } from '_TEST/utils/repositories/in-memory-team-avatar-repository'
import { InMemoryTeamMemberRepository } from '_TEST/utils/repositories/in-memory-team-member-repository'
import { InMemoryTeamProfileRepository } from '_TEST/utils/repositories/in-memory-team-profile-repository'
import { InMemoryTeamRepository } from '_TEST/utils/repositories/in-memory-team-repository'

let inMemoryTeamAvatarRepository: InMemoryTeamAvatarRepository
let inMemoryTeamMemberRepository: InMemoryTeamMemberRepository
let inMemoryTeamProfileRepository: InMemoryTeamProfileRepository
let inMemoryTeamRepository: InMemoryTeamRepository

let sut: CreateTeamUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryTeamAvatarRepository = new InMemoryTeamAvatarRepository()
    inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository()
    inMemoryTeamProfileRepository = new InMemoryTeamProfileRepository()
    inMemoryTeamRepository = new InMemoryTeamRepository(
      inMemoryTeamAvatarRepository,
      inMemoryTeamMemberRepository,
      inMemoryTeamProfileRepository,
    )

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

            expect(inMemoryTeamRepository.itens[0].members.currentItems).toHaveLength(1)
            expect(inMemoryTeamRepository.itens[0].members.currentItems).toEqual([
              expect.objectContaining({
                teamId: result.value.team.id,
                memberId: new UniqueEntityID('member-1'),
              }),
            ])

            expect(inMemoryTeamRepository.itens[0].profiles.currentItems).toHaveLength(1)
            expect(inMemoryTeamRepository.itens[0].profiles.currentItems).toEqual([
              expect.objectContaining({
                teamId: result.value.team.id,
                profileId: new UniqueEntityID('profile-1'),
              }),
            ])
          }
        })
        it('together should be able persist avatars', async () => {
          const result = await sut.execute({
            name: 'Team Name',
            companyId: 'company-1',
            avatarsIds: ['avatar-1', 'avatar-2'],
            membersIds: [],
            profilesIds: [],
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
        it('together should be able persist members', async () => {
          const result = await sut.execute({
            name: 'Team Name',
            companyId: 'company-1',
            membersIds: ['member-1', 'member-2'],
            avatarsIds: [],
            profilesIds: [],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryTeamMemberRepository.itens).toHaveLength(2)
          expect(inMemoryTeamMemberRepository.itens).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                memberId: new UniqueEntityID('member-1'),
              }),
              expect.objectContaining({
                memberId: new UniqueEntityID('member-2'),
              }),
            ]),
          )
        })
        it('together should be able persist profiles', async () => {
          const result = await sut.execute({
            name: 'Team Name',
            companyId: 'company-1',
            profilesIds: ['profile-1', 'profile-2'],
            membersIds: [],
            avatarsIds: [],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryTeamProfileRepository.itens).toHaveLength(2)
          expect(inMemoryTeamProfileRepository.itens).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                profileId: new UniqueEntityID('profile-1'),
              }),
              expect.objectContaining({
                profileId: new UniqueEntityID('profile-2'),
              }),
            ]),
          )
        })
      })
    })
  })
})
