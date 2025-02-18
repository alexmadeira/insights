import { InvalidReferenceStatusError } from '_DOM/application/use-cases/_errors/invalid-reference-status-error'
import { CreateReferenceUseCase } from '_DOM/application/use-cases/reference/create-reference'
import { InMemoryReferenceRepository } from 'src/__tests__/utils/repositories/in-memory-reference-repository'

let inMemoryReferenceRepository: InMemoryReferenceRepository
let sut: CreateReferenceUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryReferenceRepository = new InMemoryReferenceRepository()
    sut = new CreateReferenceUseCase(inMemoryReferenceRepository)
  })

  describe('Use case', () => {
    describe('Reference', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            name: 'Reference name',
            statusCode: 'active',
            networkId: 'network-1',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryReferenceRepository.itens[0].name).toEqual('Reference name')
          expect(inMemoryReferenceRepository.itens[0].status.code).toEqual('active')
          expect(inMemoryReferenceRepository.itens[0].network.toString()).toEqual('network-1')
          expect(inMemoryReferenceRepository.itens[0].slug.value).toEqual('reference-name')
        })

        it('should be able without status', async () => {
          const result = await sut.execute({
            name: 'reference name',
            networkId: 'network-1',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryReferenceRepository.itens[0].status.code).toEqual('active')
        })

        it("should't be able with an invalid status", async () => {
          const result = await sut.execute({
            name: 'reference name',
            statusCode: 'invalid-status',
            networkId: 'network-1',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidReferenceStatusError)
        })
      })
    })
  })
})
