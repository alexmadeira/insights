import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditProfileUseCase } from '_DOMApp/use-cases/profile/edit-profile'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeProfile } from '_TEST/utils/factories/make-profile'
import { InMemoryProfileRepository } from '_TEST/utils/repositories/in-memory-profile-repository'

let inMemoryProfileRepository: InMemoryProfileRepository
let sut: EditProfileUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryProfileRepository = new InMemoryProfileRepository()
    sut = new EditProfileUseCase(inMemoryProfileRepository)
  })

  describe('Use case', () => {
    describe('Profile', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          await inMemoryProfileRepository.create(makeProfile({}, new UniqueEntityID('profile-01')))

          const result = await sut.execute({
            profileId: 'profile-01',
            name: 'Profile Name',
            networkId: 'network-01',
            referencesIds: ['reference-01'],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryProfileRepository.itens[0]).toMatchObject({
            name: 'Profile Name',
            network: 'network-01',
            references: ['reference-01'],
          })
        })
        it("should't be able if not found", async () => {
          await inMemoryProfileRepository.create(makeProfile({}, new UniqueEntityID('profile-01')))

          const result = await sut.execute({
            profileId: 'profile-02',
            name: 'Profile Name',
            networkId: 'network-01',
            referencesIds: ['reference-01'],
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
