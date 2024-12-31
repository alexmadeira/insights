import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { DeleteMediaUseCase } from '_DOMApp/use-cases/media/delete-media'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeMedia } from '_TEST/utils/factories/make-media'
import { InMemoryMediaRepository } from '_TEST/utils/repositories/in-memory-media-repository'

let inMemoryMediaRepository: InMemoryMediaRepository
let sut: DeleteMediaUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryMediaRepository = new InMemoryMediaRepository()
    sut = new DeleteMediaUseCase(inMemoryMediaRepository)
  })

  describe('Use case', () => {
    describe('Media', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          await inMemoryMediaRepository.create(makeMedia({}, new UniqueEntityID('media-1')))

          const result = await sut.execute({ mediaId: 'media-1' })

          expect(result.isRight()).toBe(true)
          expect(inMemoryMediaRepository.itens).toHaveLength(0)
        })

        it("should't be able if not found", async () => {
          await inMemoryMediaRepository.create(makeMedia({}, new UniqueEntityID('media-1')))

          const result = await sut.execute({ mediaId: 'media-2' })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
