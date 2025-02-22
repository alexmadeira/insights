import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ResourceNotFoundError } from '_DOM/application/use-cases/_errors/resource-not-found-error'
import { DeleteReferenceUseCase } from '_DOM/application/use-cases/reference/delete-reference'
import { makeReference } from '_TEST/utils/factories/domain/make-reference'
import { InMemoryReferenceRepository } from '_TEST/utils/repositories/in-memory-reference-repository'

let inMemoryReferenceRepository: InMemoryReferenceRepository
let sut: DeleteReferenceUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryReferenceRepository = new InMemoryReferenceRepository()
    sut = new DeleteReferenceUseCase(inMemoryReferenceRepository)
  })

  describe('Use case', () => {
    describe('Reference', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          await inMemoryReferenceRepository.create(makeReference({}, new UniqueEntityID('reference-1')))

          const result = await sut.execute({ referenceId: 'reference-1' })

          expect(result.isRight()).toBe(true)
          expect(inMemoryReferenceRepository.itens).toHaveLength(0)
        })

        it("should't be able if not found", async () => {
          await inMemoryReferenceRepository.create(makeReference({}, new UniqueEntityID('reference-1')))

          const result = await sut.execute({ referenceId: 'reference-2' })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
