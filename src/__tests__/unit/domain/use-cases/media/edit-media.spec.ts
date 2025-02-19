import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { InvalidTypeError } from '_DOM/application/use-cases/_errors/invalid-type-error'
import { ResourceNotFoundError } from '_DOM/application/use-cases/_errors/resource-not-found-error'
import { EditMediaUseCase } from '_DOM/application/use-cases/media/edit-media'
import { makeMedia } from '_TEST/utils/factories/domain/make-media'
import { InMemoryMediaRepository } from '_TEST/utils/repositories/in-memory-media-repository'

let inMemoryMediaRepository: InMemoryMediaRepository
let sut: EditMediaUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryMediaRepository = new InMemoryMediaRepository()
    sut = new EditMediaUseCase(inMemoryMediaRepository)
  })

  describe('Use case', () => {
    describe('Media', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          await inMemoryMediaRepository.create(makeMedia({}, new UniqueEntityID('media-1')))

          const result = await sut.execute({
            mediaId: 'media-1',
            url: 'http://media.com/image.jpg',
            typeCode: 'image',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryMediaRepository.itens[0].url).toEqual('http://media.com/image.jpg')
          expect(inMemoryMediaRepository.itens[0].type.code).toEqual('image')
        })

        it("should't be able with an invalid type", async () => {
          await inMemoryMediaRepository.create(makeMedia({}, new UniqueEntityID('media-1')))

          const result = await sut.execute({
            mediaId: 'media-1',
            url: 'http://media.com/image.jpg',
            typeCode: 'invalid-type',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidTypeError)
        })

        it("should't be able if not found", async () => {
          await inMemoryMediaRepository.create(makeMedia({}, new UniqueEntityID('media-1')))

          const result = await sut.execute({
            mediaId: 'media-2',
            url: 'http://media.com/image.jpg',
            typeCode: 'image',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
