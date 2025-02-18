import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { InvalidPostStatusError } from '_DOM/application/use-cases/_errors/invalid-post-status-error'
import { CreatePostUseCase } from '_DOM/application/use-cases/post/create-post'
import { InMemoryPostMediaRepository } from '_TEST/utils/repositories/in-memory-post-media-repository'
import { InMemoryPostRepository } from '_TEST/utils/repositories/in-memory-post-repository'

let inMemoryPostMediaRepository: InMemoryPostMediaRepository
let inMemoryPostRepository: InMemoryPostRepository

let sut: CreatePostUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryPostMediaRepository = new InMemoryPostMediaRepository()
    inMemoryPostRepository = new InMemoryPostRepository(inMemoryPostMediaRepository)

    sut = new CreatePostUseCase(inMemoryPostRepository)
  })

  describe('Use case', () => {
    describe('Post', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            title: 'Post Title',
            description: 'Post Description',
            likes: 20,
            deslikes: 2,
            comments: 10,
            networkId: 'network-1',
            statusCode: 'scheduled',
            scheduledDate: new Date('2021-01-01'),
            cover: 'http://post.com/post.png',
            mediasIds: ['media-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryPostRepository.itens[0].title).toEqual('Post Title')
            expect(inMemoryPostRepository.itens[0].description).toEqual('Post Description')
            expect(inMemoryPostRepository.itens[0].likes).toEqual(20)
            expect(inMemoryPostRepository.itens[0].deslikes).toEqual(2)
            expect(inMemoryPostRepository.itens[0].comments).toEqual(10)
            expect(inMemoryPostRepository.itens[0].network.toString()).toEqual('network-1')
            expect(inMemoryPostRepository.itens[0].status.code).toEqual('scheduled')
            expect(inMemoryPostRepository.itens[0].scheduledDate).toEqual(new Date('2021-01-01'))
            expect(inMemoryPostRepository.itens[0].cover).toEqual('http://post.com/post.png')

            expect(inMemoryPostRepository.itens[0].medias.currentItems).toHaveLength(1)
            expect(inMemoryPostRepository.itens[0].medias.currentItems).toEqual([
              expect.objectContaining({
                postId: result.value.post.id,
                mediaId: new UniqueEntityID('media-1'),
              }),
            ])
          }
        })
        it('should be able without scheduledDate', async () => {
          const result = await sut.execute({
            title: 'Post Title',
            description: 'Post Description',
            likes: 20,
            deslikes: 2,
            comments: 10,
            networkId: 'network-1',
            statusCode: 'scheduled',
            cover: 'http://post.com/post.png',
            mediasIds: [],
          })

          expect(result.isRight()).toBe(true)
        })
        it('should be able without deslikes', async () => {
          const result = await sut.execute({
            title: 'Post Title',
            description: 'Post Description',
            likes: 20,
            comments: 10,
            networkId: 'network-1',
            statusCode: 'scheduled',
            cover: 'http://post.com/post.png',
            mediasIds: [],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryPostRepository.itens[0].deslikes).toBeUndefined()
        })

        it('together should be able persist medias', async () => {
          const result = await sut.execute({
            title: 'Post Title',
            description: 'Post Description',
            likes: 20,
            comments: 10,
            networkId: 'network-1',
            statusCode: 'scheduled',
            cover: 'http://post.com/post.png',
            mediasIds: ['media-1', 'media-2'],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryPostMediaRepository.itens).toHaveLength(2)
          expect(inMemoryPostMediaRepository.itens).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                mediaId: new UniqueEntityID('media-1'),
              }),
              expect.objectContaining({
                mediaId: new UniqueEntityID('media-2'),
              }),
            ]),
          )
        })
        it("should't be able with an invalid status", async () => {
          const result = await sut.execute({
            title: 'Post Title',
            description: 'Post Description',
            likes: 20,
            comments: 10,
            networkId: 'network-1',
            statusCode: 'invalid-status',
            cover: 'http://post.com/post.png',
            mediasIds: [],
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidPostStatusError)
        })
      })
    })
  })
})
