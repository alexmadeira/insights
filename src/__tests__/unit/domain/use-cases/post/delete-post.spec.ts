import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ResourceNotFoundError } from '_DOMApp/use-cases/_errors/resource-not-found-error'
import { DeletePostUseCase } from '_DOMApp/use-cases/post/delete-post'
import { makePost } from '_TEST/utils/factories/domain/make-post'
import { makePostMedia } from '_TEST/utils/factories/domain/make-post-media'
import { InMemoryPostMediaRepository } from '_TEST/utils/repositories/in-memory-post-media-repository'
import { InMemoryPostRepository } from '_TEST/utils/repositories/in-memory-post-repository'

let inMemoryPostMediaRepository: InMemoryPostMediaRepository
let inMemoryPostRepository: InMemoryPostRepository

let sut: DeletePostUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryPostMediaRepository = new InMemoryPostMediaRepository()
    inMemoryPostRepository = new InMemoryPostRepository(inMemoryPostMediaRepository)

    sut = new DeletePostUseCase(inMemoryPostRepository)
  })

  describe('Use case', () => {
    describe('Post', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          const post = makePost({}, new UniqueEntityID('post-1'))
          await inMemoryPostRepository.create(post)
          await inMemoryPostMediaRepository.create(makePostMedia({ postId: post.id }))

          const result = await sut.execute({ postId: 'post-1' })

          expect(result.isRight()).toBe(true)
          expect(inMemoryPostRepository.itens).toHaveLength(0)
          expect(inMemoryPostMediaRepository.itens).toHaveLength(0)
        })

        it("should't be able if not found", async () => {
          await inMemoryPostRepository.create(makePost({}, new UniqueEntityID('post-1')))

          const result = await sut.execute({ postId: 'post-2' })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
