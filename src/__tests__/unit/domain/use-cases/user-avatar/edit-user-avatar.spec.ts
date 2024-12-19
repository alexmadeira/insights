import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditUserAvatarUseCase } from '_DOMApp/use-cases/user-avatar/edit-user-avatar'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeUserAvatar } from '_TEST/utils/factories/make-user-avatar'
import { InMemoryUserAvatarRepository } from '_TEST/utils/repositories/in-memory-user-avatar-repository'

let inMemoryUserAvatarRepository: InMemoryUserAvatarRepository
let sut: EditUserAvatarUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryUserAvatarRepository = new InMemoryUserAvatarRepository()
    sut = new EditUserAvatarUseCase(inMemoryUserAvatarRepository)
  })

  describe('Use case', () => {
    describe('Avatar', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          await inMemoryUserAvatarRepository.create(makeUserAvatar({}, new UniqueEntityID('avatar-01')))

          const result = await sut.execute({
            avatarId: 'avatar-01',
            name: 'novo avatar',
            url: 'https://github.com/alexmadeira.png',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryUserAvatarRepository.itens[0].name).toEqual('novo avatar')
          expect(inMemoryUserAvatarRepository.itens[0].url).toEqual('https://github.com/alexmadeira.png')
          expect(inMemoryUserAvatarRepository.itens[0].acronym.value).toEqual('na')
        })

        it('should`t be able if not found', async () => {
          await inMemoryUserAvatarRepository.create(makeUserAvatar({}, new UniqueEntityID('avatar-01')))

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
