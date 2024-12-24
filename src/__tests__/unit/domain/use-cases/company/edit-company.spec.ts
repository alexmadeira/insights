import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditCompanyUseCase } from '_DOMApp/use-cases/company/edit-company'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeCompany } from '_TEST/utils/factories/make-company'
import { makeCompanyTeam } from '_TEST/utils/factories/make-company-team'
import { InMemoryCompanyAvatarRepository } from '_TEST/utils/repositories/in-memory-company-avatar-repository'
import { InMemoryCompanyRepository } from '_TEST/utils/repositories/in-memory-company-repository'
import { InMemoryCompanyTeamRepository } from '_TEST/utils/repositories/in-memory-company-team-repository'

let inMemoryCompanyAvatarRepository: InMemoryCompanyAvatarRepository
let inMemoryCompanyTeamRepository: InMemoryCompanyTeamRepository
let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: EditCompanyUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryCompanyAvatarRepository = new InMemoryCompanyAvatarRepository()
    inMemoryCompanyTeamRepository = new InMemoryCompanyTeamRepository()
    inMemoryCompanyRepository = new InMemoryCompanyRepository(
      inMemoryCompanyAvatarRepository,
      inMemoryCompanyTeamRepository,
    )

    sut = new EditCompanyUseCase(inMemoryCompanyRepository, inMemoryCompanyTeamRepository)
  })

  describe('Use case', () => {
    describe('Company', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          const company = makeCompany({}, new UniqueEntityID('company-01'))
          await inMemoryCompanyRepository.create(company)

          await inMemoryCompanyTeamRepository.createMany([
            makeCompanyTeam({
              companyId: company.id,
              teamId: new UniqueEntityID('team-1'),
            }),
            makeCompanyTeam({
              companyId: company.id,
              teamId: new UniqueEntityID('team-2'),
            }),
          ])

          const result = await sut.execute({
            companyId: 'company-01',
            name: 'Company Name',
            teamsIds: ['team-4'],
            membersIds: ['member-1'],
            profilesIds: ['profile-1'],
            avatarUrl: 'http://company-avatar.com/image.png',
          })

          expect(result.isRight()).toBe(true)

          if (result.isRight()) {
            expect(inMemoryCompanyRepository.itens[0].name).toEqual('Company Name')
            expect(inMemoryCompanyRepository.itens[0].members).toEqual(['member-1'])
            expect(inMemoryCompanyRepository.itens[0].profiles).toEqual(['profile-1'])

            expect(inMemoryCompanyAvatarRepository.itens[0].name).toEqual(result.value.company.avatar.name)
            expect(inMemoryCompanyAvatarRepository.itens[0].url).toEqual(result.value.company.avatar.url)
            expect(inMemoryCompanyAvatarRepository.itens[0].acronym.value).toEqual(
              result.value.company.avatar.acronym.value,
            )

            expect(inMemoryCompanyRepository.itens[0].teams.currentItems).toHaveLength(1)
            expect(inMemoryCompanyRepository.itens[0].teams.currentItems).toEqual([
              expect.objectContaining({ teamId: new UniqueEntityID('team-4') }),
            ])
          }
        })
        it('should be able sync teams', async () => {
          const company = makeCompany({}, new UniqueEntityID('company-01'))
          await inMemoryCompanyRepository.create(company)

          await inMemoryCompanyTeamRepository.createMany([
            makeCompanyTeam({
              companyId: company.id,
              teamId: new UniqueEntityID('team-1'),
            }),
            makeCompanyTeam({
              companyId: company.id,
              teamId: new UniqueEntityID('team-2'),
            }),
          ])

          const result = await sut.execute({
            companyId: 'company-01',
            name: 'Company Name',
            teamsIds: ['team-4', 'team-1'],
            membersIds: [],
            profilesIds: [],
          })

          if (result.isRight()) {
            expect(inMemoryCompanyTeamRepository.itens).toHaveLength(2)
            expect(inMemoryCompanyTeamRepository.itens).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  teamId: new UniqueEntityID('team-4'),
                }),
                expect.objectContaining({
                  teamId: new UniqueEntityID('team-1'),
                }),
              ]),
            )
          }
        })
        it('should`t be able if not found', async () => {
          const company = makeCompany({}, new UniqueEntityID('company-01'))
          await inMemoryCompanyRepository.create(company)

          await inMemoryCompanyTeamRepository.createMany([
            makeCompanyTeam({
              companyId: company.id,
              teamId: new UniqueEntityID('team-1'),
            }),
          ])

          const result = await sut.execute({
            companyId: 'company-02',
            name: 'Company Name',
            teamsIds: [],
            membersIds: [],
            profilesIds: [],
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
