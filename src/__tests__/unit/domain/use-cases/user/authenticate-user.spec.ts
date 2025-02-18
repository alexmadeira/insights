import { UserWrongCredentialsError } from '_DOM/application/use-cases/_errors/user-wrong-credentials-error'
import { AuthenticateUserUseCase } from '_DOM/application/use-cases/user/authenticate-user'
import { makeUser } from '_TEST/utils/factories/domain/make-user'
import { InMemoryUserRepository } from '_TEST/utils/repositories/in-memory-user-repository'
import { FakeEncrypter } from '_TEST/utils/services/cryptography/fake-encrypter'
import { FakeHasher } from '_TEST/utils/services/cryptography/fake-hasher'

let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let inMemoryUserRepository: InMemoryUserRepository

let sut: AuthenticateUserUseCase

describe('Domain', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    inMemoryUserRepository = new InMemoryUserRepository()

    sut = new AuthenticateUserUseCase(inMemoryUserRepository, fakeHasher, fakeEncrypter)
  })

  describe('Use case', () => {
    describe('User', () => {
      describe('Authenticate', () => {
        it('should be able', async () => {
          const user = makeUser({
            indetifier: 'indetifier.user',
            hash: await fakeHasher.hash('123456'),
          })

          await inMemoryUserRepository.create(user)

          const result = await sut.execute({
            password: '123456',
            indetifier: 'indetifier.user',
          })

          expect(result.isRight()).toBe(true)

          if (result.isRight()) {
            expect(result.value.accessToken).toBeTypeOf('string')
          }
        })
        it("shouldn't be able with non-existent identifier", async () => {
          await inMemoryUserRepository.create(makeUser({ indetifier: 'indetifier.user' }))

          const result = await sut.execute({
            password: 'invalid_password',
            indetifier: 'invalid_indetifier',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(UserWrongCredentialsError)
        })
        it("shouldn't be able with invalid password", async () => {
          await inMemoryUserRepository.create(
            makeUser({
              indetifier: 'indetifier.user',
              hash: await fakeHasher.hash('123456'),
            }),
          )

          const result = await sut.execute({
            password: 'invalid_password',
            indetifier: 'indetifier.user',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(UserWrongCredentialsError)
        })
        it("shouldn't be able to with wrong credentials", async () => {
          await inMemoryUserRepository.create(
            makeUser({
              indetifier: 'indetifier.user',
              hash: await fakeHasher.hash('123456'),
            }),
          )

          const result = await sut.execute({
            password: 'invalid_password',
            indetifier: 'invalid_indetifier',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(UserWrongCredentialsError)
        })
      })
    })
  })
})
