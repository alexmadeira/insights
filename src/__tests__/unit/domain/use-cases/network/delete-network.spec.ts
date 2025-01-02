import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'
import { DeleteNetworkUseCase } from '_DOMApp/use-cases/network/delete-network'
import { makeNetwork } from '_TEST/utils/factories/make-network'
import { makeNetworkPost } from '_TEST/utils/factories/make-network-post'
import { InMemoryNetworkPostRepository } from '_TEST/utils/repositories/in-memory-network-post-repository'
import { InMemoryNetworkRepository } from '_TEST/utils/repositories/in-memory-network-repository'

let inMemoryNetworkRepository: InMemoryNetworkRepository
let inMemoryNetworkPostRepository: InMemoryNetworkPostRepository

let sut: DeleteNetworkUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryNetworkPostRepository = new InMemoryNetworkPostRepository()
    inMemoryNetworkRepository = new InMemoryNetworkRepository(inMemoryNetworkPostRepository)

    sut = new DeleteNetworkUseCase(inMemoryNetworkRepository)
  })

  describe('Use case', () => {
    describe('Network', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          const network = makeNetwork({}, new UniqueEntityID('network-1'))
          await inMemoryNetworkRepository.create(network)
          await inMemoryNetworkPostRepository.create(makeNetworkPost({ networkId: network.id }))

          const result = await sut.execute({ networkId: 'network-1' })

          expect(result.isRight()).toBe(true)
          expect(inMemoryNetworkRepository.itens).toHaveLength(0)
          expect(inMemoryNetworkPostRepository.itens).toHaveLength(0)
        })

        it("should't be able if not found", async () => {
          await inMemoryNetworkRepository.create(makeNetwork({}, new UniqueEntityID('network-1')))

          const result = await sut.execute({ networkId: 'network-2' })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
