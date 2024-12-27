import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { DeleteProfileUseCase } from '_DOMApp/use-cases/profile/delete-profile'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeProfile } from '_TEST/utils/factories/make-profile'
import { InMemoryProfileRepository } from '_TEST/utils/repositories/in-memory-profile-repository'

let inMemoryProfileRepository: InMemoryProfileRepository
let sut: DeleteProfileUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryProfileRepository = new InMemoryProfileRepository()
    sut = new DeleteProfileUseCase(inMemoryProfileRepository)
  })

  describe('Use case', () => {
    describe('Profile', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          await inMemoryProfileRepository.create(makeProfile({}, new UniqueEntityID('profile-1')))

          const result = await sut.execute({
            profileId: 'profile-1',
          })
          expect(result.isRight()).toBe(true)
          expect(inMemoryProfileRepository.itens).toHaveLength(0)
        })

        it("should't be able if not found", async () => {
          await inMemoryProfileRepository.create(makeProfile({}, new UniqueEntityID('profile-1')))

          const result = await sut.execute({
            profileId: 'profile-2',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
