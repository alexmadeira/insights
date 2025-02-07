import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { InvalidReferenceStatusError } from '_DOMApp/use-cases/errors/invalid-reference-status-error'
import { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'
import { EditReferenceUseCase } from '_DOMApp/use-cases/reference/edit-reference'
import { makeReference } from '_TEST/utils/factories/domain/make-reference'
import { InMemoryReferenceRepository } from '_TEST/utils/repositories/in-memory-reference-repository'

let inMemoryReferenceRepository: InMemoryReferenceRepository
let sut: EditReferenceUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryReferenceRepository = new InMemoryReferenceRepository()
    sut = new EditReferenceUseCase(inMemoryReferenceRepository)
  })

  describe('Use case', () => {
    describe('Reference', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          await inMemoryReferenceRepository.create(makeReference({}, new UniqueEntityID('reference-1')))

          const result = await sut.execute({
            referenceId: 'reference-1',
            name: 'Reference Name',
            statusCode: 'inactive',
            networkId: 'network-1',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryReferenceRepository.itens[0].name).toEqual('Reference Name')
          expect(inMemoryReferenceRepository.itens[0].status.code).toEqual('inactive')
          expect(inMemoryReferenceRepository.itens[0].network.toString()).toEqual('network-1')
        })

        it("should't be able with an invalid status", async () => {
          await inMemoryReferenceRepository.create(makeReference({}, new UniqueEntityID('reference-1')))

          const result = await sut.execute({
            referenceId: 'reference-1',
            name: 'Reference Name',
            statusCode: 'invalid-status',
            networkId: 'network-1',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidReferenceStatusError)
        })

        it("should't be able if not found", async () => {
          await inMemoryReferenceRepository.create(makeReference({}, new UniqueEntityID('reference-1')))

          const result = await sut.execute({
            referenceId: 'reference-2',
            name: 'Reference Name',
            statusCode: 'inactive',
            networkId: 'network-1',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
