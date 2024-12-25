import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CreateCompanyUseCase } from '_DOMApp/use-cases/company/create-company'
import { InMemoryCompanyAvatarRepository } from '_TEST/utils/repositories/in-memory-company-avatar-repository'
import { InMemoryCompanyMemberRepository } from '_TEST/utils/repositories/in-memory-company-member-repository'
import { InMemoryCompanyRepository } from '_TEST/utils/repositories/in-memory-company-repository'
import { InMemoryCompanyTeamRepository } from '_TEST/utils/repositories/in-memory-company-team-repository'

let inMemoryCompanyAvatarRepository: InMemoryCompanyAvatarRepository
let inMemoryCompanyTeamRepository: InMemoryCompanyTeamRepository
let inMemoryCompanyMemberRepository: InMemoryCompanyMemberRepository
let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: CreateCompanyUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryCompanyAvatarRepository = new InMemoryCompanyAvatarRepository()
    inMemoryCompanyTeamRepository = new InMemoryCompanyTeamRepository()
    inMemoryCompanyMemberRepository = new InMemoryCompanyMemberRepository()
    inMemoryCompanyRepository = new InMemoryCompanyRepository(
      inMemoryCompanyAvatarRepository,
      inMemoryCompanyTeamRepository,
      inMemoryCompanyMemberRepository,
    )
    sut = new CreateCompanyUseCase(inMemoryCompanyRepository)
  })

  describe('Use case', () => {
    describe('Company', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            name: 'Company Name',
            teamsIds: ['team-1'],
            membersIds: ['member-1'],
            profilesIds: ['profile-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryCompanyRepository.itens[0].name).toEqual('Company Name')
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

            expect(inMemoryCompanyRepository.itens[0].members.currentItems).toHaveLength(1)
            expect(inMemoryCompanyRepository.itens[0].members.currentItems).toEqual([
              expect.objectContaining({
                memberId: new UniqueEntityID('member-1'),
                companyId: result.value.company.id,
              }),
            ])
          }
        })
        it('together should be able persist avatar', async () => {
          const result = await sut.execute({
            name: 'Company Name',
            teamsIds: ['team-1'],
            membersIds: ['members-1'],
            profilesIds: ['profile-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryCompanyAvatarRepository.itens).toHaveLength(1)
            expect(inMemoryCompanyAvatarRepository.itens[0]).toEqual(
              expect.objectContaining({
                name: 'Company Name',
                companyId: result.value.company.id,
              }),
            )
          }
        })
        it('together should be able persist teams', async () => {
          const result = await sut.execute({
            name: 'Company Name',
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
        it('together should be able persist members', async () => {
          const result = await sut.execute({
            name: 'Company Name',
            teamsIds: [],
            membersIds: ['member-1', 'member-2'],
            profilesIds: [],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryCompanyMemberRepository.itens).toHaveLength(2)
            expect(inMemoryCompanyMemberRepository.itens).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  memberId: new UniqueEntityID('member-1'),
                }),
                expect.objectContaining({
                  memberId: new UniqueEntityID('member-2'),
                }),
              ]),
            )
          }
        })
      })
    })
  })
})
