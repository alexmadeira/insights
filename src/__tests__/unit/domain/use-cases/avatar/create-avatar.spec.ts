import { CreateAvatarUseCase } from '_DOMApp/use-cases/avatar/create-avatar'
import { InMemoryAvatarRepository } from 'src/__tests__/utils/repositories/in-memory-avatar-repository'

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
            name: 'avatar name',
            url: 'https://github.com/alexmadeira.png',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryAvatarRepository.itens[0].name).toEqual('avatar name')
          expect(inMemoryAvatarRepository.itens[0].url).toEqual('https://github.com/alexmadeira.png')
          expect(inMemoryAvatarRepository.itens[0].acronym.value).toEqual('an')
        })
      })
    })
  })
})
