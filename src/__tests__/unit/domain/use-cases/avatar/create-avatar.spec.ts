import { CreateAvatarUseCase } from '_DOMApp/use-cases/avatar/create-avatar'
import { InMemoryAvatarRepository } from '_TEST/utils/repositories/in-memory-avatar-repository'

let inMemoryAvatarRepository: InMemoryAvatarRepository

let sut: CreateAvatarUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryAvatarRepository = new InMemoryAvatarRepository()
    sut = new CreateAvatarUseCase(inMemoryAvatarRepository)
  })

  describe('Use case', () => {
    describe('Avatar', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            name: 'Avatar Name',
            isDefault: true,
            url: 'http://avatar.com/avatar.png',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryAvatarRepository.itens[0].name).toEqual('Avatar Name')
          expect(inMemoryAvatarRepository.itens[0].acronym.value).toEqual('an')
          expect(inMemoryAvatarRepository.itens[0].isDefault).toEqual(true)
          expect(inMemoryAvatarRepository.itens[0].url).toEqual('http://avatar.com/avatar.png')
        })
        it('should be able without url', async () => {
          const result = await sut.execute({
            name: 'Avatar Name',
            isDefault: true,
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryAvatarRepository.itens[0].url).toBeUndefined()
        })
      })
    })
  })
})
