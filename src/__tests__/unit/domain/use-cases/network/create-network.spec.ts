import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { InvalidTypeError } from '_DOM/application/use-cases/_errors/invalid-type-error'
import { CreateNetworkUseCase } from '_DOM/application/use-cases/network/create-network'
import { InMemoryNetworkPostRepository } from '_TEST/utils/repositories/in-memory-network-post-repository'
import { InMemoryNetworkRepository } from 'src/__tests__/utils/repositories/in-memory-network-repository'

let inMemoryNetworkRepository: InMemoryNetworkRepository
let inMemoryNetworkPostRepository: InMemoryNetworkPostRepository

let sut: CreateNetworkUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryNetworkPostRepository = new InMemoryNetworkPostRepository()
    inMemoryNetworkRepository = new InMemoryNetworkRepository(inMemoryNetworkPostRepository)

    sut = new CreateNetworkUseCase(inMemoryNetworkRepository)
  })

  describe('Use case', () => {
    describe('Network', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            name: 'network name',
            typeCode: 'ig',
            username: 'network-name',
            avatar: 'http://avatar.com/avatar.jpg',
            postsIds: ['post-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryNetworkRepository.itens[0].name).toEqual('network name')
            expect(inMemoryNetworkRepository.itens[0].username).toEqual('network-name')
            expect(inMemoryNetworkRepository.itens[0].avatar).toEqual('http://avatar.com/avatar.jpg')
            expect(inMemoryNetworkRepository.itens[0].type.code).toEqual('ig')

            expect(inMemoryNetworkRepository.itens[0].posts.currentItems).toHaveLength(1)
            expect(inMemoryNetworkRepository.itens[0].posts.currentItems).toEqual([
              expect.objectContaining({
                networkId: result.value.network.id,
                postId: new UniqueEntityID('post-1'),
              }),
            ])
          }
        })
        it('together should be able persist posts', async () => {
          const result = await sut.execute({
            name: 'network name',
            typeCode: 'ig',
            username: 'network-name',
            avatar: 'http://avatar.com/avatar.jpg',
            postsIds: ['post-1', 'post-2'],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryNetworkPostRepository.itens).toHaveLength(2)
          expect(inMemoryNetworkPostRepository.itens).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                postId: new UniqueEntityID('post-1'),
              }),
              expect.objectContaining({
                postId: new UniqueEntityID('post-2'),
              }),
            ]),
          )
        })
        it("should't be able with an invalid type", async () => {
          const result = await sut.execute({
            name: 'network name',
            typeCode: 'invalid-type',
            username: 'network-name',
            avatar: 'http://avatar.com/avatar.jpg',
            postsIds: [],
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidTypeError)
        })
      })
    })
  })
})
