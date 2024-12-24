import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditMemberUseCase } from '_DOMApp/use-cases/member/edit-member'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeMember } from '_TEST/utils/factories/make-member'
import { makeMemberTeam } from '_TEST/utils/factories/make-member-team'
import { InMemoryMemberAvatarRepository } from '_TEST/utils/repositories/in-memory-member-avatar-repository'
import { InMemoryMemberRepository } from '_TEST/utils/repositories/in-memory-member-repository'
import { InMemoryMemberTeamRepository } from '_TEST/utils/repositories/in-memory-member-team-repository'

let inMemoryMemberAvatarRepository: InMemoryMemberAvatarRepository
let inMemoryMemberTeamRepository: InMemoryMemberTeamRepository
let inMemoryMemberRepository: InMemoryMemberRepository

let sut: EditMemberUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryMemberAvatarRepository = new InMemoryMemberAvatarRepository()
    inMemoryMemberTeamRepository = new InMemoryMemberTeamRepository()
    inMemoryMemberRepository = new InMemoryMemberRepository(
      inMemoryMemberAvatarRepository,
      inMemoryMemberTeamRepository,
    )

    sut = new EditMemberUseCase(inMemoryMemberRepository, inMemoryMemberTeamRepository)
  })

  describe('Use case', () => {
    describe('Member', () => {
      describe('Edit', () => {
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
            name: 'Member Name',
            email: 'member@emal.com',
            role: 'member',
            companyId: 'company-1',
            teamsIds: ['team-1', 'team-3'],
            avatarUrl: 'http://member-avatar.com/image.png',
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryMemberRepository.itens[0].name).toEqual('Member Name')
            expect(inMemoryMemberRepository.itens[0].email).toEqual('member@emal.com')
            expect(inMemoryMemberRepository.itens[0].role.code).toEqual('member')
            expect(inMemoryMemberRepository.itens[0].company.toString()).toEqual('company-1')

            expect(inMemoryMemberRepository.itens[0].avatar.name).toEqual('Member Name')
            expect(inMemoryMemberRepository.itens[0].avatar.acronym.value).toEqual('mn')

            expect(inMemoryMemberAvatarRepository.itens[0].name).toEqual(result.value.member.avatar.name)
            expect(inMemoryMemberAvatarRepository.itens[0].acronym.value).toEqual(
              result.value.member.avatar.acronym.value,
            )
            expect(inMemoryMemberAvatarRepository.itens[0].url).toEqual(result.value.member.avatar.url)

            expect(inMemoryMemberRepository.itens[0].teams.currentItems).toHaveLength(2)
            expect(inMemoryMemberRepository.itens[0].teams.currentItems).toEqual([
              expect.objectContaining({ teamId: new UniqueEntityID('team-1') }),
              expect.objectContaining({ teamId: new UniqueEntityID('team-3') }),
            ])
          }
        })
        it('should be able sync teams', async () => {
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
            name: 'Member Name',
            email: 'member@emal.com',
            role: 'member',
            companyId: 'company-1',
            teamsIds: ['team-1', 'team-3'],
            avatarUrl: 'http://member-avatar.com/image.png',
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryMemberTeamRepository.itens).toHaveLength(2)
            expect(inMemoryMemberTeamRepository.itens).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  teamId: new UniqueEntityID('team-1'),
                }),
                expect.objectContaining({
                  teamId: new UniqueEntityID('team-3'),
                }),
              ]),
            )
          }
        })

        it('should`t be able with an invalid role', async () => {
          await inMemoryMemberRepository.create(makeMember({}, new UniqueEntityID('member-01')))

          const result = await sut.execute({
            memberId: 'member-01',
            name: 'Member Name',
            email: 'member@emal.com',
            role: 'invalid-role',
            companyId: 'company-1',
            teamsIds: ['team-1'],
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidTypeError)
        })

        it('should`t be able if not found', async () => {
          await inMemoryMemberRepository.create(makeMember({}, new UniqueEntityID('member-01')))

          const result = await sut.execute({
            memberId: 'member-02',
            name: 'Member Name',
            email: 'member@emal.com',
            role: 'invalid-role',
            companyId: 'company-1',
            teamsIds: ['team-1'],
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
