import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditCompanyUseCase } from '_DOMApp/use-cases/company/edit-company'
import { makeCompany } from '_TEST/utils/factories/make-company'
import { InMemoryCompanyAvatarRepository } from '_TEST/utils/repositories/in-memory-company-avatar-repository'
import { InMemoryCompanyRepository } from '_TEST/utils/repositories/in-memory-company-repository'

let inMemoryCompanyAvatarRepository: InMemoryCompanyAvatarRepository
let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: EditCompanyUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryCompanyAvatarRepository = new InMemoryCompanyAvatarRepository()
    inMemoryCompanyRepository = new InMemoryCompanyRepository(inMemoryCompanyAvatarRepository)
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
            avatarUrl: 'http://company-avatar.com/image.png',
          })

          expect(result.isRight()).toBe(true)

          if (result.isRight()) {
            expect(inMemoryCompanyRepository.itens[0].name).toEqual('Company Name')
            expect(inMemoryCompanyRepository.itens[0].owner).toEqual('owner-1')
            expect(inMemoryCompanyRepository.itens[0].teams).toEqual(['team-1'])
            expect(inMemoryCompanyRepository.itens[0].members).toEqual(['member-1'])
            expect(inMemoryCompanyRepository.itens[0].profiles).toEqual(['profile-1'])

            expect(inMemoryCompanyAvatarRepository.itens[0].name).toEqual(result.value.company.avatar.name)
            expect(inMemoryCompanyAvatarRepository.itens[0].acronym.value).toEqual(
              result.value.company.avatar.acronym.value,
            )
            expect(inMemoryCompanyAvatarRepository.itens[0].url).toEqual(result.value.company.avatar.url)
          }
        })
      })
    })
  })
})
