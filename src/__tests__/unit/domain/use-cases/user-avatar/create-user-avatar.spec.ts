import { CreateUserAvatarUseCase } from '_DOMApp/use-cases/user-avatar/create-user-avatar'
import { InMemoryUserAvatarRepository } from 'src/__tests__/utils/repositories/in-memory-user-avatar-repository'

let inMemoryUserAvatarRepository: InMemoryUserAvatarRepository
let sut: CreateUserAvatarUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryUserAvatarRepository = new InMemoryUserAvatarRepository()
    sut = new CreateUserAvatarUseCase(inMemoryUserAvatarRepository)
  })

  describe('Use case', () => {
    describe('User Avatar', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            userId: 'user-01',
            name: 'avatar name',
            url: 'https://github.com/alexmadeira.png',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryUserAvatarRepository.itens[0].userId.toString()).toEqual('user-01')
          expect(inMemoryUserAvatarRepository.itens[0].name).toEqual('avatar name')
          expect(inMemoryUserAvatarRepository.itens[0].url).toEqual('https://github.com/alexmadeira.png')
          expect(inMemoryUserAvatarRepository.itens[0].acronym.value).toEqual('an')
        })
      })
    })
  })
})
