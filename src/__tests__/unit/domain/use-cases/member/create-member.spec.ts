import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CreateMemberUseCase } from '_DOMApp/use-cases/member/create-member'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { InMemoryMemberAvatarRepository } from '_TEST/utils/repositories/in-memory-member-avatar-repository'
import { InMemoryMemberRepository } from '_TEST/utils/repositories/in-memory-member-repository'
import { InMemoryMemberTeamRepository } from '_TEST/utils/repositories/in-memory-member-team-repository'

let inMemoryMemberAvatarRepository: InMemoryMemberAvatarRepository
let inMemoryMemberTeamRepository: InMemoryMemberTeamRepository
let inMemoryMemberRepository: InMemoryMemberRepository
let sut: CreateMemberUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryMemberAvatarRepository = new InMemoryMemberAvatarRepository()
    inMemoryMemberTeamRepository = new InMemoryMemberTeamRepository()
    inMemoryMemberRepository = new InMemoryMemberRepository(
      inMemoryMemberAvatarRepository,
      inMemoryMemberTeamRepository,
    )

    sut = new CreateMemberUseCase(inMemoryMemberRepository)
  })

  describe('Use case', () => {
    describe('Member', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            name: 'Member Name',
            email: 'member@emal.com',
            role: 'owner',
            companyId: 'company-1',
            teamsIds: ['team-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryMemberRepository.itens[0].name).toEqual('Member Name')
            expect(inMemoryMemberRepository.itens[0].email).toEqual('member@emal.com')
            expect(inMemoryMemberRepository.itens[0].role.code).toEqual('owner')
            expect(inMemoryMemberRepository.itens[0].slug.value).toEqual('member-name')

            expect(inMemoryMemberRepository.itens[0].avatar.name).toEqual('Member Name')
            expect(inMemoryMemberRepository.itens[0].avatar.acronym.value).toEqual('mn')

            expect(inMemoryMemberRepository.itens[0].company.toString()).toEqual('company-1')
            expect(inMemoryMemberRepository.itens[0].teams.currentItems).toHaveLength(1)
            expect(inMemoryMemberRepository.itens[0].teams.currentItems).toEqual([
              expect.objectContaining({
                teamId: new UniqueEntityID('team-1'),
                memberId: result.value.member.id,
              }),
            ])
          }
        })

        it('together should be able persist avatar', async () => {
          const result = await sut.execute({
            name: 'Member Name',
            email: 'member@emal.com',
            role: 'owner',
            companyId: 'company-1',
            teamsIds: [],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryMemberAvatarRepository.itens).toHaveLength(1)
            expect(inMemoryMemberAvatarRepository.itens[0]).toEqual(
              expect.objectContaining({
                name: 'Member Name',
                memberId: result.value.member.id,
              }),
            )
          }
        })
        it('together should be able persist teams', async () => {
          const result = await sut.execute({
            name: 'Member Name',
            email: 'member@emal.com',
            role: 'owner',
            companyId: 'company-1',
            teamsIds: ['team-1', 'team-2'],
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
                  teamId: new UniqueEntityID('team-2'),
                }),
              ]),
            )
          }
        })
        it('should`t be able with an invalid role', async () => {
          const result = await sut.execute({
            name: 'Member Name',
            email: 'member@emal.com',
            role: 'invalid-role',
            companyId: 'company-1',
            teamsIds: [],
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidTypeError)
        })
      })
    })
  })
})
