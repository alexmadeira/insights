import { CreateCompanyUseCase } from '_DOMApp/use-cases/company/create-company'
import { InMemoryCompanyAvatarRepository } from '_TEST/utils/repositories/in-memory-company-avatar-repository'
import { InMemoryCompanyRepository } from '_TEST/utils/repositories/in-memory-company-repository'

let inMemoryCompanyAvatarRepository: InMemoryCompanyAvatarRepository
let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: CreateCompanyUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryCompanyAvatarRepository = new InMemoryCompanyAvatarRepository()
    inMemoryCompanyRepository = new InMemoryCompanyRepository(inMemoryCompanyAvatarRepository)
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
            membersIds: ['members-1'],
            profilesIds: ['profile-1'],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryCompanyRepository.itens[0].name).toEqual('Company Name')
          expect(inMemoryCompanyRepository.itens[0].owner).toEqual('owner-1')
          expect(inMemoryCompanyRepository.itens[0].teams).toEqual(['team-1'])
          expect(inMemoryCompanyRepository.itens[0].members).toEqual(['members-1'])
          expect(inMemoryCompanyRepository.itens[0].profiles).toEqual(['profile-1'])
          expect(inMemoryCompanyRepository.itens[0].slug.value).toEqual('company-name')

          expect(inMemoryCompanyRepository.itens[0].avatar.name).toEqual('Company Name')
          expect(inMemoryCompanyRepository.itens[0].avatar.acronym.value).toEqual('cn')
        })
      })
    })
  })
})
