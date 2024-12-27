import { CreateNetworkUseCase } from '_DOMApp/use-cases/network/create-network'
import { InMemoryNetworkRepository } from 'src/__tests__/utils/repositories/in-memory-network-repository'

let inMemoryNetworkRepository: InMemoryNetworkRepository
let sut: CreateNetworkUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryNetworkRepository = new InMemoryNetworkRepository()
    sut = new CreateNetworkUseCase(inMemoryNetworkRepository)
  })

  describe('Use case', () => {
    describe('Network', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            name: 'network name',
            username: 'network-name',
            typeId: 'facebook',
            postsIds: ['post-1', 'post-2'],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryNetworkRepository.itens[0].name).toEqual('network name')
          expect(inMemoryNetworkRepository.itens[0].username).toEqual('network-name')
          expect(inMemoryNetworkRepository.itens[0].type).toEqual('facebook')
          expect(inMemoryNetworkRepository.itens[0].posts).toEqual(['post-1', 'post-2'])
        })
      })
    })
  })
})
