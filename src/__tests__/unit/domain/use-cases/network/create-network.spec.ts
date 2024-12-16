import { CreateNetworkUseCase } from '_DOMApp/use-cases/network/create-network'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
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
            status: 'active',
            userName: 'network-name',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryNetworkRepository.itens[0].name).toEqual('network name')
          expect(inMemoryNetworkRepository.itens[0].userName).toEqual('network-name')
          expect(inMemoryNetworkRepository.itens[0].status.code).toEqual('active')
        })

        it('should be able without status', async () => {
          const result = await sut.execute({
            name: 'network name',
            userName: 'network-name',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryNetworkRepository.itens[0].status.code).toEqual('active')
        })

        it('should`t be able with an invalid status', async () => {
          const result = await sut.execute({
            name: 'network name',
            status: 'invalid-status',
            userName: 'network-name',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidTypeError)
        })
      })
    })
  })
})
