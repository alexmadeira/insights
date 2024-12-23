import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CreateCompanyUseCase } from '_DOMApp/use-cases/company/create-company'
import { InMemoryCompanyAvatarRepository } from '_TEST/utils/repositories/in-memory-company-avatar-repository'
import { InMemoryCompanyRepository } from '_TEST/utils/repositories/in-memory-company-repository'
import { InMemoryCompanyTeamRepository } from '_TEST/utils/repositories/in-memory-company-team-repository'

let inMemoryCompanyAvatarRepository: InMemoryCompanyAvatarRepository
let inMemoryCompanyTeamRepository: InMemoryCompanyTeamRepository
let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: CreateCompanyUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryCompanyAvatarRepository = new InMemoryCompanyAvatarRepository()
    inMemoryCompanyTeamRepository = new InMemoryCompanyTeamRepository()
    inMemoryCompanyRepository = new InMemoryCompanyRepository(
      inMemoryCompanyAvatarRepository,
      inMemoryCompanyTeamRepository,
    )

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
          if (result.isRight()) {
            expect(inMemoryCompanyRepository.itens[0].name).toEqual('Company Name')
            expect(inMemoryCompanyRepository.itens[0].owner.toString()).toEqual('owner-1')
            expect(inMemoryCompanyRepository.itens[0].members).toEqual(['members-1'])
            expect(inMemoryCompanyRepository.itens[0].profiles).toEqual(['profile-1'])
            expect(inMemoryCompanyRepository.itens[0].slug.value).toEqual('company-name')

            expect(inMemoryCompanyRepository.itens[0].avatar.name).toEqual('Company Name')
            expect(inMemoryCompanyRepository.itens[0].avatar.acronym.value).toEqual('cn')

            expect(inMemoryCompanyRepository.itens[0].teams.currentItems).toHaveLength(1)
            expect(inMemoryCompanyRepository.itens[0].teams.currentItems).toEqual([
              expect.objectContaining({
                teamId: new UniqueEntityID('team-1'),
                companyId: result.value.company.id,
              }),
            ])
          }
        })
        it('together should be able persist teams', async () => {
          const result = await sut.execute({
            name: 'Company Name',
            ownerId: 'owner-1',
            teamsIds: ['team-1', 'team-2'],
            membersIds: [],
            profilesIds: [],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryCompanyTeamRepository.itens).toHaveLength(2)
            expect(inMemoryCompanyTeamRepository.itens).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  teamId: new UniqueEntityID('team-1'),
                }),
                expect.objectContaining({
                  teamId: new UniqueEntityID('team-2'),
                }),
              ]),
            )
          }
        })
      })
    })
  })
})
