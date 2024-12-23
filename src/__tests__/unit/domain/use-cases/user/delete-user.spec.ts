import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { DeleteUserUseCase } from '_DOMApp/use-cases/user/delete-user'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeUser } from '_TEST/utils/factories/make-user'
import { InMemoryUserAvatarRepository } from '_TEST/utils/repositories/in-memory-user-avatar-repository'
import { InMemoryUserRepository } from '_TEST/utils/repositories/in-memory-user-repository'

let inMemoryUserAvatarRepository: InMemoryUserAvatarRepository
let inMemoryUserRepository: InMemoryUserRepository
let sut: DeleteUserUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryUserAvatarRepository = new InMemoryUserAvatarRepository()
    inMemoryUserRepository = new InMemoryUserRepository(inMemoryUserAvatarRepository)
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  describe('Use case', () => {
    describe('User', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          const user = makeUser({}, new UniqueEntityID('user-01'))
          await inMemoryUserRepository.create(user)

          const result = await sut.execute({
            userId: 'user-01',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryUserRepository.itens).toHaveLength(0)
          expect(inMemoryUserAvatarRepository.itens).toHaveLength(0)
        })

        it('should`t be able if not found', async () => {
          await inMemoryUserRepository.create(makeUser({}, new UniqueEntityID('user-01')))

          const result = await sut.execute({
            userId: 'user-02',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
