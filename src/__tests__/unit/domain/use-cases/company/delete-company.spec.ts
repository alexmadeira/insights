import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { DeleteCompanyUseCase } from '_DOMApp/use-cases/company/delete-company'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeCompany } from '_TEST/utils/factories/make-company'
import { InMemoryCompanyRepository } from '_TEST/utils/repositories/in-memory-company-repository'

let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: DeleteCompanyUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository()
    sut = new DeleteCompanyUseCase(inMemoryCompanyRepository)
  })

  describe('Use case', () => {
    describe('Company', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          await inMemoryCompanyRepository.create(makeCompany({}, new UniqueEntityID('company-01')))

          const result = await sut.execute({
            companyId: 'company-01',
          })
          expect(result.isRight()).toBe(true)
          expect(inMemoryCompanyRepository.itens).toHaveLength(0)
        })

        it('should`t be able if not found', async () => {
          await inMemoryCompanyRepository.create(makeCompany({}, new UniqueEntityID('company-01')))

          const result = await sut.execute({
            companyId: 'company-02',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
