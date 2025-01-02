import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'
import { DeleteTeamUseCase } from '_DOMApp/use-cases/team/delete-team'
import { makeTeam } from '_TEST/utils/factories/make-team'
import { makeTeamAvatar } from '_TEST/utils/factories/make-team-avatar'
import { makeTeamMember } from '_TEST/utils/factories/make-team-member'
import { makeTeamProfile } from '_TEST/utils/factories/make-team-profile'
import { InMemoryTeamAvatarRepository } from '_TEST/utils/repositories/in-memory-team-avatar-repository'
import { InMemoryTeamMemberRepository } from '_TEST/utils/repositories/in-memory-team-member-repository'
import { InMemoryTeamProfileRepository } from '_TEST/utils/repositories/in-memory-team-profile-repository'
import { InMemoryTeamRepository } from '_TEST/utils/repositories/in-memory-team-repository'

let inMemoryTeamAvatarRepository: InMemoryTeamAvatarRepository
let inMemoryTeamMemberRepository: InMemoryTeamMemberRepository
let inMemoryTeamProfileRepository: InMemoryTeamProfileRepository
let inMemoryTeamRepository: InMemoryTeamRepository

let sut: DeleteTeamUseCase

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

    sut = new DeleteTeamUseCase(inMemoryTeamRepository)
  })

  describe('Use case', () => {
    describe('Team', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          const team = makeTeam({}, new UniqueEntityID('team-1'))
          await inMemoryTeamRepository.create(team)
          await inMemoryTeamAvatarRepository.create(makeTeamAvatar({ teamId: team.id }))
          await inMemoryTeamMemberRepository.create(makeTeamMember({ teamId: team.id }))
          await inMemoryTeamProfileRepository.create(makeTeamProfile({ teamId: team.id }))

          const result = await sut.execute({ teamId: 'team-1' })

          expect(result.isRight()).toBe(true)
          expect(inMemoryTeamRepository.itens).toHaveLength(0)
          expect(inMemoryTeamAvatarRepository.itens).toHaveLength(0)
          expect(inMemoryTeamMemberRepository.itens).toHaveLength(0)
          expect(inMemoryTeamProfileRepository.itens).toHaveLength(0)
        })

        it("should't be able if not found", async () => {
          await inMemoryTeamRepository.create(makeTeam({}, new UniqueEntityID('team-1')))

          const result = await sut.execute({ teamId: 'team-2' })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
