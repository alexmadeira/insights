import { CreateReferenceUseCase } from '_DOMApp/use-cases/reference/create-reference'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
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
            status: 'active',
            networkId: 'network-01',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryReferenceRepository.itens[0].name).toEqual('Reference name')
          expect(inMemoryReferenceRepository.itens[0].status.code).toEqual('active')
          expect(inMemoryReferenceRepository.itens[0].network).toEqual('network-01')
          expect(inMemoryReferenceRepository.itens[0].slug.value).toEqual('reference-name')
        })

        it('should be able without status', async () => {
          const result = await sut.execute({
            name: 'reference name',
            networkId: 'network-01',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryReferenceRepository.itens[0].status.code).toEqual('active')
        })

        it("should't be able with an invalid status", async () => {
          const result = await sut.execute({
            name: 'reference name',
            status: 'invalid-status',
            networkId: 'network-01',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidTypeError)
        })
      })
    })
  })
})
