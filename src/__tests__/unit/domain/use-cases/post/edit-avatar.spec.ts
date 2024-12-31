import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditPostUseCase } from '_DOMApp/use-cases/post/edit-post'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makePost } from '_TEST/utils/factories/make-post'
import { makePostMedia } from '_TEST/utils/factories/make-post-media'
import { InMemoryPostMediaRepository } from '_TEST/utils/repositories/in-memory-post-media-repository'
import { InMemoryPostRepository } from '_TEST/utils/repositories/in-memory-post-repository'

let inMemoryPostMediaRepository: InMemoryPostMediaRepository
let inMemoryPostRepository: InMemoryPostRepository

let sut: EditPostUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryPostMediaRepository = new InMemoryPostMediaRepository()
    inMemoryPostRepository = new InMemoryPostRepository(inMemoryPostMediaRepository)

    sut = new EditPostUseCase(inMemoryPostRepository, inMemoryPostMediaRepository)
  })

  describe('Use case', () => {
    describe('Post', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          await inMemoryPostRepository.create(makePost({}, new UniqueEntityID('post-1')))

          const result = await sut.execute({
            postId: 'post-1',
            title: 'Post Title',
            description: 'Post Description',
            likes: 20,
            deslikes: 2,
            comments: 10,
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
        it('should be able sync medias', async () => {
          const post = makePost({}, new UniqueEntityID('post-1'))
          await inMemoryPostRepository.create(post)
          await inMemoryPostMediaRepository.createMany([
            makePostMedia({
              postId: post.id,
              mediaId: new UniqueEntityID('media-1'),
            }),
            makePostMedia({
              postId: post.id,
              mediaId: new UniqueEntityID('media-2'),
            }),
          ])

          const result = await sut.execute({
            postId: 'post-1',
            title: 'Post Title',
            description: 'Post Description',
            likes: 20,
            deslikes: 2,
            comments: 10,
            statusCode: 'scheduled',
            cover: 'http://post.com/post.png',
            mediasIds: ['media-1', 'media-3'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryPostMediaRepository.itens).toHaveLength(2)
            expect(inMemoryPostMediaRepository.itens).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  mediaId: new UniqueEntityID('media-1'),
                }),
                expect.objectContaining({
                  mediaId: new UniqueEntityID('media-3'),
                }),
              ]),
            )
          }
        })
        it("should't be able if not found", async () => {
          await inMemoryPostRepository.create(makePost({}, new UniqueEntityID('post-1')))

          const result = await sut.execute({
            postId: 'post-2',
            title: 'Post Title',
            description: 'Post Description',
            likes: 20,
            deslikes: 2,
            comments: 10,
            statusCode: 'scheduled',
            cover: 'http://post.com/post.png',
            mediasIds: [],
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
