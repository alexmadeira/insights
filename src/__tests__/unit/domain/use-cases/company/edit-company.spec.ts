import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditCompanyUseCase } from '_DOMApp/use-cases/company/edit-company'
import { makeCompany } from '_TEST/utils/factories/make-company'
import { InMemoryCompanyRepository } from '_TEST/utils/repositories/in-memory-company-repository'

let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: EditCompanyUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository()
    sut = new EditCompanyUseCase(inMemoryCompanyRepository)
  })

  describe('Use case', () => {
    describe('Company', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          await inMemoryCompanyRepository.create(makeCompany({}, new UniqueEntityID('company-01')))

          const result = await sut.execute({
            companyId: 'company-01',
            name: 'Company Name',
            ownerId: 'owner-1',
            teamsIds: ['team-1'],
            membersIds: ['member-1'],
            profilesIds: ['profile-1'],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryCompanyRepository.itens[0]).toMatchObject({
            name: 'Company Name',
            owner: 'owner-1',
            teams: ['team-1'],
            members: ['member-1'],
            profiles: ['profile-1'],
          })
        })
      })
    })
  })
})
