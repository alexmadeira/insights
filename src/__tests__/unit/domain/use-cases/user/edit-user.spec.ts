import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditUserUseCase } from '_DOMApp/use-cases/user/edit-user'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeUser } from '_TEST/utils/factories/make-user'
import { makeUserTeam } from '_TEST/utils/factories/make-user-team'
import { InMemoryUserRepository } from '_TEST/utils/repositories/in-memory-user-repository'
import { InMemoryUserTeamRepository } from '_TEST/utils/repositories/in-memory-user-team-repository'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUserTeamRepository: InMemoryUserTeamRepository
let sut: EditUserUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryUserTeamRepository = new InMemoryUserTeamRepository()
    inMemoryUserRepository = new InMemoryUserRepository(inMemoryUserTeamRepository)
    sut = new EditUserUseCase(inMemoryUserRepository, inMemoryUserTeamRepository)
  })

  describe('Use case', () => {
    describe('User', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          const user = makeUser({}, new UniqueEntityID('user-01'))
          await inMemoryUserRepository.create(makeUser({}, new UniqueEntityID('user-01')))
          await inMemoryUserTeamRepository.createMany(
            makeUserTeam({
              userId: user.id,
              teamId: new UniqueEntityID('team-1'),
            }),
            makeUserTeam({
              userId: user.id,
              teamId: new UniqueEntityID('team-2'),
            }),
          )

          const result = await sut.execute({
            userId: 'user-01',
            name: 'User Name',
            email: 'user@emal.com',
            role: 'member',
            companyId: 'company-1',
            teamsIds: ['team-1', 'team-3'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryUserRepository.itens[0].name).toEqual('User Name')
            expect(inMemoryUserRepository.itens[0].email).toEqual('user@emal.com')
            expect(inMemoryUserRepository.itens[0].role.code).toEqual('member')
            expect(inMemoryUserRepository.itens[0].company.toString()).toEqual('company-1')
            expect(inMemoryUserRepository.itens[0].teams.currentItems).toHaveLength(2)
            expect(inMemoryUserRepository.itens[0].teams.currentItems).toEqual([
              expect.objectContaining({ teamId: new UniqueEntityID('team-1') }),
              expect.objectContaining({ teamId: new UniqueEntityID('team-3') }),
            ])
          }
        })

        it('should`t be able with an invalid role', async () => {
          await inMemoryUserRepository.create(makeUser({}, new UniqueEntityID('user-01')))

          const result = await sut.execute({
            userId: 'user-01',
            name: 'User Name',
            email: 'user@emal.com',
            role: 'invalid-role',
            companyId: 'company-1',
            teamsIds: ['team-1'],
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidTypeError)
        })

        it('should`t be able if not found', async () => {
          await inMemoryUserRepository.create(makeUser({}, new UniqueEntityID('user-01')))

          const result = await sut.execute({
            userId: 'user-02',
            name: 'User Name',
            email: 'user@emal.com',
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
