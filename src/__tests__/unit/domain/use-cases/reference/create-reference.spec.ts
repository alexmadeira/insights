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
            name: 'reference name',
            status: 'active',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryReferenceRepository.itens[0].name).toEqual('reference name')
        })

        it('should be able without status', async () => {
          const result = await sut.execute({
            name: 'reference name',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryReferenceRepository.itens[0].status.code).toEqual('active')
        })

        it('should`t be able with an invalid status', async () => {
          const result = await sut.execute({
            name: 'reference name',
            status: 'invalid-status',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidTypeError)
        })
      })
    })
  })
})
