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
            teamId: 'team-1',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryUserRepository.itens[0].name).toEqual('User Name')
          expect(inMemoryUserRepository.itens[0].email).toEqual('user@emal.com')
          expect(inMemoryUserRepository.itens[0].role.code).toEqual('owner')

          expect(inMemoryUserRepository.itens[0].company).toEqual('company-1')
          expect(inMemoryUserRepository.itens[0].team).toEqual('team-1')
        })
        it('should`t be able with an invalid role', async () => {
          const result = await sut.execute({
            name: 'User Name',
            email: 'user@emal.com',
            role: 'invalid-role',
            companyId: 'company-1',
            teamId: 'team-1',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidTypeError)
        })
      })
    })
  })
})
