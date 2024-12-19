import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { DeleteUserAvatarUseCase } from '_DOMApp/use-cases/user-avatar/delete-user-avatar'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeUserAvatar } from '_TEST/utils/factories/make-user-avatar'
import { InMemoryUserAvatarRepository } from '_TEST/utils/repositories/in-memory-user-avatar-repository'

let inMemoryUserAvatarRepository: InMemoryUserAvatarRepository
let sut: DeleteUserAvatarUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryUserAvatarRepository = new InMemoryUserAvatarRepository()
    sut = new DeleteUserAvatarUseCase(inMemoryUserAvatarRepository)
  })

  describe('Use case', () => {
    describe('User Avatar', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          await inMemoryUserAvatarRepository.create(makeUserAvatar({}, new UniqueEntityID('avatar-01')))

          const result = await sut.execute({
            avatarId: 'avatar-01',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryUserAvatarRepository.itens).toHaveLength(0)
        })

        it('should`t be able if not found', async () => {
          await inMemoryUserAvatarRepository.create(makeUserAvatar({}, new UniqueEntityID('avatar-01')))

          const result = await sut.execute({
            avatarId: 'avatar-02',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
