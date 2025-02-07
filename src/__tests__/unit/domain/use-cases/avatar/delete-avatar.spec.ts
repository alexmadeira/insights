import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { DeleteAvatarUseCase } from '_DOMApp/use-cases/avatar/delete-avatar'
import { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'
import { makeAvatar } from '_TEST/utils/factories/domain/make-avatar'
import { InMemoryAvatarRepository } from '_TEST/utils/repositories/in-memory-avatar-repository'

let inMemoryAvatarRepository: InMemoryAvatarRepository
let sut: DeleteAvatarUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryAvatarRepository = new InMemoryAvatarRepository()
    sut = new DeleteAvatarUseCase(inMemoryAvatarRepository)
  })

  describe('Use case', () => {
    describe('Avatar', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          await inMemoryAvatarRepository.create(makeAvatar({}, new UniqueEntityID('avatar-1')))

          const result = await sut.execute({ avatarId: 'avatar-1' })

          expect(result.isRight()).toBe(true)
          expect(inMemoryAvatarRepository.itens).toHaveLength(0)
        })

        it("should't be able if not found", async () => {
          await inMemoryAvatarRepository.create(makeAvatar({}, new UniqueEntityID('avatar-1')))

          const result = await sut.execute({ avatarId: 'avatar-2' })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
