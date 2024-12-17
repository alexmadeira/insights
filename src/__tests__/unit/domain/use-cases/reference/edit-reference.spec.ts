import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditReferenceUseCase } from '_DOMApp/use-cases/reference/edit-reference'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeReference } from '_TEST/utils/factories/make-reference'
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
          await inMemoryReferenceRepository.create(makeReference({}, new UniqueEntityID('reference-01')))

          const result = await sut.execute({
            referenceId: 'reference-01',
            name: 'Reference Name',
            status: 'inactive',
            networkId: 'network-01',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryReferenceRepository.itens[0]).toMatchObject({
            name: 'Reference Name',
            network: 'network-01',
          })
        })

        it('should`t be able with an invalid status', async () => {
          await inMemoryReferenceRepository.create(makeReference({}, new UniqueEntityID('reference-01')))

          const result = await sut.execute({
            referenceId: 'reference-01',
            name: 'Reference Name',
            status: 'invalid-status',
            networkId: 'network-01',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidTypeError)
        })

        it('should`t be able if not found', async () => {
          await inMemoryReferenceRepository.create(makeReference({}, new UniqueEntityID('reference-01')))

          const result = await sut.execute({
            referenceId: 'reference-02',
            name: 'Reference Name',
            status: 'inactive',
            networkId: 'network-01',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
