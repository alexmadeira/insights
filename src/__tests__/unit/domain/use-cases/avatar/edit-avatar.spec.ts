import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditAvatarUseCase } from '_DOMApp/use-cases/avatar/edit-avatar'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeAvatar } from '_TEST/utils/factories/make-avatar'
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
          await inMemoryAvatarRepository.create(makeAvatar({}, new UniqueEntityID('avatar-01')))

          const result = await sut.execute({
            avatarId: 'avatar-01',
            name: 'novo avatar',
            url: 'https://github.com/alexmadeira.png',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryAvatarRepository.itens[0].name).toEqual('novo avatar')
          expect(inMemoryAvatarRepository.itens[0].url).toEqual('https://github.com/alexmadeira.png')
          expect(inMemoryAvatarRepository.itens[0].acronym.value).toEqual('na')
        })

        it('should`t be able if not found', async () => {
          await inMemoryAvatarRepository.create(makeAvatar({}, new UniqueEntityID('avatar-01')))

          const result = await sut.execute({
            avatarId: 'avatar-02',
            name: 'avatar name',
            url: 'https://github.com/alexmadeira.png',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
