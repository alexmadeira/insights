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
          })

          expect(result.isRight()).toBe(true)

          if (result.isRight()) {
            expect(inMemoryAvatarRepository.itens[0].name).toEqual('Avatar Name')
            expect(inMemoryAvatarRepository.itens[0].url).toBeUndefined()
            expect(inMemoryAvatarRepository.itens[0].acronym.value).toEqual('an')
          }
        })
      })
    })
  })
})
