import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { DeleteNetworkUseCase } from '_DOMApp/use-cases/network/delete-network'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeNetwork } from '_TEST/utils/factories/make-network'
import { InMemoryNetworkRepository } from '_TEST/utils/repositories/in-memory-network-repository'

let inMemoryNetworkRepository: InMemoryNetworkRepository
let sut: DeleteNetworkUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryNetworkRepository = new InMemoryNetworkRepository()
    sut = new DeleteNetworkUseCase(inMemoryNetworkRepository)
  })

  describe('Use case', () => {
    describe('Network', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          await inMemoryNetworkRepository.create(makeNetwork({}, new UniqueEntityID('network-01')))

          const result = await sut.execute({
            networkId: 'network-01',
          })
          expect(result.isRight()).toBe(true)
          expect(inMemoryNetworkRepository.itens).toHaveLength(0)
        })

        it('should`t be able if not found', async () => {
          await inMemoryNetworkRepository.create(makeNetwork({}, new UniqueEntityID('network-01')))

          const result = await sut.execute({
            networkId: 'network-02',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
