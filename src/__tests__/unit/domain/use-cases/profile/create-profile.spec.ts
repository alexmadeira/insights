import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CreateProfileUseCase } from '_DOMApp/use-cases/profile/create-profile'
import { InMemoryProfileReferenceRepository } from '_TEST/utils/repositories/in-memory-profile-reference-repository'
import { InMemoryProfileRepository } from 'src/__tests__/utils/repositories/in-memory-profile-repository'

let inMemoryProfileReferenceRepository: InMemoryProfileReferenceRepository
let inMemoryProfileRepository: InMemoryProfileRepository

let sut: CreateProfileUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryProfileReferenceRepository = new InMemoryProfileReferenceRepository()
    inMemoryProfileRepository = new InMemoryProfileRepository(inMemoryProfileReferenceRepository)

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
            expect(inMemoryProfileRepository.itens[0].network.toString()).toEqual('network-1')

            expect(inMemoryProfileRepository.itens[0].references.currentItems).toHaveLength(1)
            expect(inMemoryProfileRepository.itens[0].references.currentItems).toEqual([
              expect.objectContaining({
                profileId: result.value.profile.id,
                referenceId: new UniqueEntityID('reference-1'),
              }),
            ])
          }
        })
        it('together should be able persist references', async () => {
          const result = await sut.execute({
            name: 'Company Name',
            networkId: 'network-1',
            referencesIds: ['reference-1', 'reference-2'],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryProfileReferenceRepository.itens).toHaveLength(2)
          expect(inMemoryProfileReferenceRepository.itens).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                referenceId: new UniqueEntityID('reference-1'),
              }),
              expect.objectContaining({
                referenceId: new UniqueEntityID('reference-2'),
              }),
            ]),
          )
        })
      })
    })
  })
})
