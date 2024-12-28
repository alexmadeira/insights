import { CreateProfileUseCase } from '_DOMApp/use-cases/profile/create-profile'
import { InMemoryProfileRepository } from 'src/__tests__/utils/repositories/in-memory-profile-repository'

let inMemoryProfileRepository: InMemoryProfileRepository
let sut: CreateProfileUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryProfileRepository = new InMemoryProfileRepository()
    sut = new CreateProfileUseCase(inMemoryProfileRepository)
  })

  describe('Use case', () => {
    describe('Profile', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            name: 'Profile Name',
            networkId: 'network-1',
            referencesIds: ['reference-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryProfileRepository.itens[0].name).toEqual('Profile Name')
            expect(inMemoryProfileRepository.itens[0].slug.value).toEqual('profile-name')
            expect(inMemoryProfileRepository.itens[0].network).toEqual('network-1')
          }
        })
      })
    })
  })
})
