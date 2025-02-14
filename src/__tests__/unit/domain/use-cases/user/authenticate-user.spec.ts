import { AuthenticateUserUseCase } from '_DOMApp/use-cases/user/authenticate-user'
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
      })
    })
  })
})
