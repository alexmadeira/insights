import { UserAlreadyExistisError } from '_DOM/application/use-cases/_errors/user-already-existis-error'
import { RegisterUserUseCase } from '_DOM/application/use-cases/user/register-user'
import { makeUser } from '_TEST/utils/factories/domain/make-user'
import { InMemoryUserRepository } from '_TEST/utils/repositories/in-memory-user-repository'
import { FakeHasher } from '_TEST/utils/services/cryptography/fake-hasher'

let inMemoryUserRepository: InMemoryUserRepository
let fakeHasher: FakeHasher

let sut: RegisterUserUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterUserUseCase(inMemoryUserRepository, fakeHasher)
  })

  describe('Use case', () => {
    describe('User', () => {
      describe('Register', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            name: 'User Name',
            email: 'user@emal.com',
            password: 'password',
            indetifier: 'indetifier',
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryUserRepository.itens[0].name).toEqual('User Name')
            expect(inMemoryUserRepository.itens[0].email).toEqual('user@emal.com')
            expect(inMemoryUserRepository.itens[0].indetifier).toEqual('indetifier')
          }
        })
        it('should be able hashed password upon registration', async () => {
          const result = await sut.execute({
            name: 'User Name',
            email: 'user@emal.com',
            password: '123456',
            indetifier: 'indetifier',
          })

          const isHashed = await fakeHasher.compare('123456', inMemoryUserRepository.itens[0].hash)

          expect(result.isRight()).toBe(true)
          expect(isHashed).toBe(true)
        })
        it("shouldn't be able to with an existing user", async () => {
          inMemoryUserRepository.create(makeUser({ indetifier: 'indetifier.user' }))

          const result = await sut.execute({
            name: 'User Name',
            email: 'user@emal.com',
            password: '123456',
            indetifier: 'indetifier.user',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(UserAlreadyExistisError)
        })
      })
    })
  })
})
