import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { DeleteMemberUseCase } from '_DOMApp/use-cases/member/delete-member'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeMember } from '_TEST/utils/factories/make-member'
import { makeMemberTeam } from '_TEST/utils/factories/make-member-team'
import { InMemoryMemberAvatarRepository } from '_TEST/utils/repositories/in-memory-member-avatar-repository'
import { InMemoryMemberRepository } from '_TEST/utils/repositories/in-memory-member-repository'
import { InMemoryMemberTeamRepository } from '_TEST/utils/repositories/in-memory-member-team-repository'

let inMemoryMemberAvatarRepository: InMemoryMemberAvatarRepository
let inMemoryMemberTeamRepository: InMemoryMemberTeamRepository
let inMemoryMemberRepository: InMemoryMemberRepository
let sut: DeleteMemberUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryMemberAvatarRepository = new InMemoryMemberAvatarRepository()
    inMemoryMemberTeamRepository = new InMemoryMemberTeamRepository()
    inMemoryMemberRepository = new InMemoryMemberRepository(
      inMemoryMemberAvatarRepository,
      inMemoryMemberTeamRepository,
    )

    sut = new DeleteMemberUseCase(inMemoryMemberRepository)
  })

  describe('Use case', () => {
    describe('Member', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          const member = makeMember({}, new UniqueEntityID('member-01'))
          await inMemoryMemberRepository.create(member)
          await inMemoryMemberTeamRepository.createMany([
            makeMemberTeam({
              memberId: member.id,
              teamId: new UniqueEntityID('team-1'),
            }),
            makeMemberTeam({
              memberId: member.id,
              teamId: new UniqueEntityID('team-2'),
            }),
          ])

          const result = await sut.execute({
            memberId: 'member-01',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryMemberRepository.itens).toHaveLength(0)
          expect(inMemoryMemberAvatarRepository.itens).toHaveLength(0)
          expect(inMemoryMemberTeamRepository.itens).toHaveLength(0)
        })

        it('should`t be able if not found', async () => {
          await inMemoryMemberRepository.create(makeMember({}, new UniqueEntityID('member-01')))

          const result = await sut.execute({
            memberId: 'member-02',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
