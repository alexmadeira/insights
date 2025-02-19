import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ResourceNotFoundError } from '_DOM/application/use-cases/_errors/resource-not-found-error'
import { DeleteCompanyUseCase } from '_DOM/application/use-cases/company/delete-company'
import { makeCompany } from '_TEST/utils/factories/domain/make-company'
import { makeCompanyAvatar } from '_TEST/utils/factories/domain/make-company-avatar'
import { makeCompanyMember } from '_TEST/utils/factories/domain/make-company-member'
import { makeCompanyTeam } from '_TEST/utils/factories/domain/make-company-team'
import { InMemoryCompanyAvatarRepository } from '_TEST/utils/repositories/in-memory-company-avatar-repository'
import { InMemoryCompanyMemberRepository } from '_TEST/utils/repositories/in-memory-company-member-repository'
import { InMemoryCompanyProfileRepository } from '_TEST/utils/repositories/in-memory-company-profile-repository'
import { InMemoryCompanyRepository } from '_TEST/utils/repositories/in-memory-company-repository'
import { InMemoryCompanyTeamRepository } from '_TEST/utils/repositories/in-memory-company-team-repository'

let inMemoryCompanyAvatarRepository: InMemoryCompanyAvatarRepository
let inMemoryCompanyTeamRepository: InMemoryCompanyTeamRepository
let inMemoryCompanyMemberRepository: InMemoryCompanyMemberRepository
let inMemoryCompanyProfileRepository: InMemoryCompanyProfileRepository

let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: DeleteCompanyUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryCompanyAvatarRepository = new InMemoryCompanyAvatarRepository()
    inMemoryCompanyTeamRepository = new InMemoryCompanyTeamRepository()
    inMemoryCompanyMemberRepository = new InMemoryCompanyMemberRepository()
    inMemoryCompanyProfileRepository = new InMemoryCompanyProfileRepository()
    inMemoryCompanyRepository = new InMemoryCompanyRepository(
      inMemoryCompanyAvatarRepository,
      inMemoryCompanyTeamRepository,
      inMemoryCompanyMemberRepository,
      inMemoryCompanyProfileRepository,
    )

    sut = new DeleteCompanyUseCase(inMemoryCompanyRepository)
  })

  describe('Use case', () => {
    describe('Company', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          const company = makeCompany({}, new UniqueEntityID('company-1'))
          await inMemoryCompanyRepository.create(company)
          await inMemoryCompanyTeamRepository.create(makeCompanyTeam({ companyId: company.id }))
          await inMemoryCompanyAvatarRepository.create(makeCompanyAvatar({ companyId: company.id }))
          await inMemoryCompanyMemberRepository.create(makeCompanyMember({ companyId: company.id }))

          const result = await sut.execute({ companyId: 'company-1' })

          expect(result.isRight()).toBe(true)
          expect(inMemoryCompanyRepository.itens).toHaveLength(0)
          expect(inMemoryCompanyTeamRepository.itens).toHaveLength(0)
          expect(inMemoryCompanyAvatarRepository.itens).toHaveLength(0)
          expect(inMemoryCompanyMemberRepository.itens).toHaveLength(0)
        })

        it("should't be able if not found", async () => {
          await inMemoryCompanyRepository.create(makeCompany({}, new UniqueEntityID('company-1')))

          const result = await sut.execute({ companyId: 'company-2' })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
