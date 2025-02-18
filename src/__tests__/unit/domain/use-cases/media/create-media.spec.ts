import { InvalidTypeError } from '_DOM/application/use-cases/_errors/invalid-type-error'
import { CreateMediaUseCase } from '_DOM/application/use-cases/media/create-media'
import { InMemoryMediaRepository } from 'src/__tests__/utils/repositories/in-memory-media-repository'

let inMemoryMediaRepository: InMemoryMediaRepository
let sut: CreateMediaUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryMediaRepository = new InMemoryMediaRepository()
    sut = new CreateMediaUseCase(inMemoryMediaRepository)
  })

  describe('Use case', () => {
    describe('Media', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            url: 'http://media.com/image.jpg',
            typeCode: 'image',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryMediaRepository.itens[0].url).toEqual('http://media.com/image.jpg')
          expect(inMemoryMediaRepository.itens[0].type.code).toEqual('image')
        })

        it("should't be able with an invalid type", async () => {
          const result = await sut.execute({
            url: 'http://media.com/image.jpg',
            typeCode: 'invalid-type',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidTypeError)
        })
      })
    })
  })
})
