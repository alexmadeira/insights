import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ResourceNotFoundError } from '_DOM/application/use-cases/_errors/resource-not-found-error'
import { DeleteProfileUseCase } from '_DOM/application/use-cases/profile/delete-profile'
import { makeProfile } from '_TEST/utils/factories/domain/make-profile'
import { makeProfileReference } from '_TEST/utils/factories/domain/make-profile-reference'
import { InMemoryProfileReferenceRepository } from '_TEST/utils/repositories/in-memory-profile-reference-repository'
import { InMemoryProfileRepository } from '_TEST/utils/repositories/in-memory-profile-repository'

let inMemoryProfileReferenceRepository: InMemoryProfileReferenceRepository
let inMemoryProfileRepository: InMemoryProfileRepository

let sut: DeleteProfileUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryProfileReferenceRepository = new InMemoryProfileReferenceRepository()
    inMemoryProfileRepository = new InMemoryProfileRepository(inMemoryProfileReferenceRepository)

    sut = new DeleteProfileUseCase(inMemoryProfileRepository)
  })

  describe('Use case', () => {
    describe('Profile', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          const profile = makeProfile({}, new UniqueEntityID('profile-1'))
          await inMemoryProfileRepository.create(profile)
          await inMemoryProfileReferenceRepository.create(makeProfileReference({ profileId: profile.id }))

          const result = await sut.execute({ profileId: 'profile-1' })

          expect(result.isRight()).toBe(true)
          expect(inMemoryProfileRepository.itens).toHaveLength(0)
          expect(inMemoryProfileReferenceRepository.itens).toHaveLength(0)
        })

        it("should't be able if not found", async () => {
          await inMemoryProfileRepository.create(makeProfile({}, new UniqueEntityID('profile-1')))

          const result = await sut.execute({ profileId: 'profile-2' })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
