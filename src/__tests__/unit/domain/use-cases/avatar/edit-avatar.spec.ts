import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ResourceNotFoundError } from '_DOM/application/use-cases/_errors/resource-not-found-error'
import { EditAvatarUseCase } from '_DOM/application/use-cases/avatar/edit-avatar'
import { makeAvatar } from '_TEST/utils/factories/domain/make-avatar'
import { InMemoryAvatarRepository } from '_TEST/utils/repositories/in-memory-avatar-repository'

let inMemoryAvatarRepository: InMemoryAvatarRepository
let sut: EditAvatarUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryAvatarRepository = new InMemoryAvatarRepository()
    sut = new EditAvatarUseCase(inMemoryAvatarRepository)
  })

  describe('Use case', () => {
    describe('Avatar', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          await inMemoryAvatarRepository.create(makeAvatar({}, new UniqueEntityID('avatar-1')))

          const result = await sut.execute({
            avatarId: 'avatar-1',
            name: 'Name Avatar',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryAvatarRepository.itens[0].name).toEqual('Name Avatar')
          expect(inMemoryAvatarRepository.itens[0].acronym.value).toEqual('na')
          expect(inMemoryAvatarRepository.itens[0].url).toBeUndefined()
        })

        it("should't be able if not found", async () => {
          await inMemoryAvatarRepository.create(makeAvatar({}, new UniqueEntityID('avatar-1')))

          const result = await sut.execute({
            avatarId: 'avatar-2',
            name: 'Avatar Name',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
