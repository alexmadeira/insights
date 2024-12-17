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
            name: 'profile name',
            networkId: 'network-01',
            referencesIds: ['reference-01'],
          })
          expect(result.isRight()).toBe(true)
          expect(inMemoryProfileRepository.itens[0]).toEqual(result.value?.profile)
        })
      })
    })
  })
})
