import { CreatePostUseCase } from '_DOMApp/use-cases/post/create-post'
import { InMemoryPostRepository } from 'src/__tests__/utils/repositories/in-memory-post-repository'

let inMemoryPostRepository: InMemoryPostRepository
let sut: CreatePostUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryPostRepository = new InMemoryPostRepository()
    sut = new CreatePostUseCase(inMemoryPostRepository)
  })

  describe('Use case', () => {
    describe('Post', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            title: 'post name',
          })
          expect(result.isRight()).toBe(true)
          expect(inMemoryPostRepository.itens[0]).toEqual(result.value?.post)
        })
      })
    })
  })
})
