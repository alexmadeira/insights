import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ResourceNotFoundError } from '_DOMApp/use-cases/_errors/resource-not-found-error'
import { EditTeamUseCase } from '_DOMApp/use-cases/team/edit-team'
import { makeTeam } from '_TEST/utils/factories/domain/make-team'
import { makeTeamAvatar } from '_TEST/utils/factories/domain/make-team-avatar'
import { makeTeamMember } from '_TEST/utils/factories/domain/make-team-member'
import { makeTeamProfile } from '_TEST/utils/factories/domain/make-team-profile'
import { InMemoryTeamAvatarRepository } from '_TEST/utils/repositories/in-memory-team-avatar-repository'
import { InMemoryTeamMemberRepository } from '_TEST/utils/repositories/in-memory-team-member-repository'
import { InMemoryTeamProfileRepository } from '_TEST/utils/repositories/in-memory-team-profile-repository'
import { InMemoryTeamRepository } from '_TEST/utils/repositories/in-memory-team-repository'

let inMemoryTeamAvatarRepository: InMemoryTeamAvatarRepository
let inMemoryTeamMemberRepository: InMemoryTeamMemberRepository
let inMemoryTeamProfileRepository: InMemoryTeamProfileRepository
let inMemoryTeamRepository: InMemoryTeamRepository

let sut: EditTeamUseCase

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

    sut = new EditTeamUseCase(
      inMemoryTeamRepository,
      inMemoryTeamAvatarRepository,
      inMemoryTeamMemberRepository,
      inMemoryTeamProfileRepository,
    )
  })

  describe('Use case', () => {
    describe('Team', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          await inMemoryTeamRepository.create(makeTeam({}, new UniqueEntityID('team-1')))

          const result = await sut.execute({
            teamId: 'team-1',
            name: 'Team Name',
            membersIds: ['member-1'],
            avatarsIds: ['avatar-1'],
            profilesIds: ['profile-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryTeamRepository.itens[0].name).toEqual('Team Name')

            expect(inMemoryTeamRepository.itens[0].avatars.currentItems).toHaveLength(1)
            expect(inMemoryTeamRepository.itens[0].avatars.currentItems).toEqual([
              expect.objectContaining({ teamId: result.value.team.id, avatarId: new UniqueEntityID('avatar-1') }),
            ])

            expect(inMemoryTeamRepository.itens[0].members.currentItems).toHaveLength(1)
            expect(inMemoryTeamRepository.itens[0].members.currentItems).toEqual([
              expect.objectContaining({ teamId: result.value.team.id, memberId: new UniqueEntityID('member-1') }),
            ])

            expect(inMemoryTeamRepository.itens[0].profiles.currentItems).toHaveLength(1)
            expect(inMemoryTeamRepository.itens[0].profiles.currentItems).toEqual([
              expect.objectContaining({ teamId: result.value.team.id, profileId: new UniqueEntityID('profile-1') }),
            ])
          }
        })
        it('should be able sync avatars', async () => {
          const team = makeTeam({}, new UniqueEntityID('team-1'))
          await inMemoryTeamRepository.create(team)
          await inMemoryTeamAvatarRepository.createMany([
            makeTeamAvatar({
              teamId: team.id,
              avatarId: new UniqueEntityID('avatar-1'),
            }),
            makeTeamAvatar({
              teamId: team.id,
              avatarId: new UniqueEntityID('avatar-2'),
            }),
          ])

          const result = await sut.execute({
            teamId: 'team-1',
            name: 'Team Name',
            avatarsIds: ['avatar-2', 'avatar-4'],
            membersIds: [],
            profilesIds: [],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryTeamRepository.itens[0].avatars.currentItems).toHaveLength(2)
            expect(inMemoryTeamRepository.itens[0].avatars.currentItems).toEqual([
              expect.objectContaining({
                teamId: result.value.team.id,
                avatarId: new UniqueEntityID('avatar-2'),
              }),
              expect.objectContaining({
                teamId: result.value.team.id,
                avatarId: new UniqueEntityID('avatar-4'),
              }),
            ])
          }
        })
        it('should be able sync members', async () => {
          const team = makeTeam({}, new UniqueEntityID('team-1'))
          await inMemoryTeamRepository.create(team)
          await inMemoryTeamMemberRepository.createMany([
            makeTeamMember({
              teamId: team.id,
              memberId: new UniqueEntityID('member-1'),
            }),
            makeTeamMember({
              teamId: team.id,
              memberId: new UniqueEntityID('member-2'),
            }),
          ])

          const result = await sut.execute({
            teamId: 'team-1',
            name: 'Team Name',
            membersIds: ['member-2', 'member-4'],
            avatarsIds: [],
            profilesIds: [],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryTeamRepository.itens[0].members.currentItems).toHaveLength(2)
            expect(inMemoryTeamRepository.itens[0].members.currentItems).toEqual([
              expect.objectContaining({
                teamId: result.value.team.id,
                memberId: new UniqueEntityID('member-2'),
              }),
              expect.objectContaining({
                teamId: result.value.team.id,
                memberId: new UniqueEntityID('member-4'),
              }),
            ])
          }
        })
        it('should be able sync profiles', async () => {
          const team = makeTeam({}, new UniqueEntityID('team-1'))
          await inMemoryTeamRepository.create(team)
          await inMemoryTeamProfileRepository.createMany([
            makeTeamProfile({
              teamId: team.id,
              profileId: new UniqueEntityID('profile-1'),
            }),
            makeTeamProfile({
              teamId: team.id,
              profileId: new UniqueEntityID('profile-2'),
            }),
          ])

          const result = await sut.execute({
            teamId: 'team-1',
            name: 'Team Name',
            profilesIds: ['profile-2', 'profile-4'],
            membersIds: [],
            avatarsIds: [],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryTeamRepository.itens[0].profiles.currentItems).toHaveLength(2)
            expect(inMemoryTeamRepository.itens[0].profiles.currentItems).toEqual([
              expect.objectContaining({
                teamId: result.value.team.id,
                profileId: new UniqueEntityID('profile-2'),
              }),
              expect.objectContaining({
                teamId: result.value.team.id,
                profileId: new UniqueEntityID('profile-4'),
              }),
            ])
          }
        })
        it("should't be able if not found", async () => {
          await inMemoryTeamRepository.create(makeTeam({}, new UniqueEntityID('team-1')))

          const result = await sut.execute({
            teamId: 'team-2',
            name: 'Team Name',
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
