import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CreateUserUseCase } from '_DOMApp/use-cases/user/create-user'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { InMemoryUserRepository } from '_TEST/utils/repositories/in-memory-user-repository'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(inMemoryUserRepository)
  })

  describe('Use case', () => {
    describe('User', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            name: 'User Name',
            email: 'user@emal.com',
            role: 'owner',
            companyId: 'company-1',
            teamsIds: ['team-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryUserRepository.itens[0].name).toEqual('User Name')
            expect(inMemoryUserRepository.itens[0].email).toEqual('user@emal.com')
            expect(inMemoryUserRepository.itens[0].role.code).toEqual('owner')
            expect(inMemoryUserRepository.itens[0].slug.value).toEqual('user-name')
            expect(inMemoryUserRepository.itens[0].company.toString()).toEqual('company-1')
            expect(inMemoryUserRepository.itens[0].teams.currentItems).toHaveLength(1)
            expect(inMemoryUserRepository.itens[0].teams.currentItems).toEqual([
              expect.objectContaining({
                teamId: new UniqueEntityID('team-1'),
                userId: result.value.user.id,
              }),
            ])
          }
        })
        it('should`t be able with an invalid role', async () => {
          const result = await sut.execute({
            name: 'User Name',
            email: 'user@emal.com',
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
