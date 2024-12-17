import { CreateCompanyUseCase } from '_DOMApp/use-cases/company/create-company'
import { InMemoryCompanyRepository } from '_TEST/utils/repositories/in-memory-company-repository'

let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: CreateCompanyUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository()
    sut = new CreateCompanyUseCase(inMemoryCompanyRepository)
  })

  describe('Use case', () => {
    describe('Company', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            name: 'Company Name',
            ownerId: 'owner-1',
            teamsIds: ['team-1'],
            membesIds: ['member-1'],
            profilesIds: ['profile-1'],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryCompanyRepository.itens[0]).toEqual(result.value?.company)
        })
      })
    })
  })
})
