import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditCompanyUseCase } from '_DOMApp/use-cases/company/edit-company'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeCompany } from '_TEST/utils/factories/make-company'
import { makeCompanyMember } from '_TEST/utils/factories/make-company-member'
import { makeCompanyProfile } from '_TEST/utils/factories/make-company-profile'
import { makeCompanyTeam } from '_TEST/utils/factories/make-company-team'
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

let sut: EditCompanyUseCase

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

    sut = new EditCompanyUseCase(
      inMemoryCompanyRepository,
      inMemoryCompanyTeamRepository,
      inMemoryCompanyMemberRepository,
      inMemoryCompanyProfileRepository,
    )
  })

  describe('Use case', () => {
    describe('Company', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          const company = makeCompany({}, new UniqueEntityID('company-01'))
          await inMemoryCompanyRepository.create(company)
          await inMemoryCompanyTeamRepository.create(
            makeCompanyTeam({
              companyId: company.id,
              teamId: new UniqueEntityID('team-1'),
            }),
          )
          await inMemoryCompanyMemberRepository.create(
            makeCompanyMember({
              companyId: company.id,
              memberId: new UniqueEntityID('member-1'),
            }),
          )
          await inMemoryCompanyProfileRepository.create(
            makeCompanyProfile({
              companyId: company.id,
              profileId: new UniqueEntityID('profile-1'),
            }),
          )

          const result = await sut.execute({
            companyId: 'company-01',
            name: 'Company Name',
            teamsIds: ['team-1'],
            membersIds: ['member-1'],
            profilesIds: ['profile-1'],
            avatarUrl: 'http://company-avatar.com/image.png',
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryCompanyRepository.itens[0].name).toEqual('Company Name')

            expect(inMemoryCompanyAvatarRepository.itens[0].name).toEqual(result.value.company.avatar.name)
            expect(inMemoryCompanyAvatarRepository.itens[0].url).toEqual(result.value.company.avatar.url)
            expect(inMemoryCompanyAvatarRepository.itens[0].acronym.value).toEqual(
              result.value.company.avatar.acronym.value,
            )

            expect(inMemoryCompanyRepository.itens[0].teams.currentItems).toHaveLength(1)
            expect(inMemoryCompanyRepository.itens[0].teams.currentItems).toEqual([
              expect.objectContaining({ teamId: new UniqueEntityID('team-1') }),
            ])

            expect(inMemoryCompanyRepository.itens[0].members.currentItems).toHaveLength(1)
            expect(inMemoryCompanyRepository.itens[0].members.currentItems).toEqual([
              expect.objectContaining({ memberId: new UniqueEntityID('member-1') }),
            ])

            expect(inMemoryCompanyRepository.itens[0].profiles.currentItems).toHaveLength(1)
            expect(inMemoryCompanyRepository.itens[0].profiles.currentItems).toEqual([
              expect.objectContaining({ profileId: new UniqueEntityID('profile-1') }),
            ])
          }
        })
        it('should be able sync teams', async () => {
          const company = makeCompany({}, new UniqueEntityID('company-1'))
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
            companyId: 'company-1',
            name: 'Company Name',
            teamsIds: ['team-4', 'team-1'],
            membersIds: [],
            profilesIds: [],
          })

          expect(result.isRight()).toBe(true)
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
        it('should be able sync members', async () => {
          const company = makeCompany({}, new UniqueEntityID('company-1'))
          await inMemoryCompanyRepository.create(company)
          await inMemoryCompanyMemberRepository.createMany([
            makeCompanyMember({
              companyId: company.id,
              memberId: new UniqueEntityID('member-1'),
            }),
            makeCompanyMember({
              companyId: company.id,
              memberId: new UniqueEntityID('member-2'),
            }),
          ])

          const result = await sut.execute({
            companyId: 'company-1',
            name: 'Company Name',
            membersIds: ['member-4', 'member-1'],
            teamsIds: [],
            profilesIds: [],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryCompanyMemberRepository.itens).toHaveLength(2)
            expect(inMemoryCompanyMemberRepository.itens).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  memberId: new UniqueEntityID('member-4'),
                }),
                expect.objectContaining({
                  memberId: new UniqueEntityID('member-1'),
                }),
              ]),
            )
          }
        })
        it('should be able sync profile', async () => {
          const company = makeCompany({}, new UniqueEntityID('company-1'))
          await inMemoryCompanyRepository.create(company)
          await inMemoryCompanyProfileRepository.createMany([
            makeCompanyProfile({
              companyId: company.id,
              profileId: new UniqueEntityID('profile-1'),
            }),
            makeCompanyProfile({
              companyId: company.id,
              profileId: new UniqueEntityID('profile-2'),
            }),
          ])

          const result = await sut.execute({
            companyId: 'company-1',
            name: 'Company Name',
            membersIds: [],
            teamsIds: [],
            profilesIds: ['profile-4', 'profile-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryCompanyProfileRepository.itens).toHaveLength(2)
            expect(inMemoryCompanyProfileRepository.itens).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  profileId: new UniqueEntityID('profile-4'),
                }),
                expect.objectContaining({
                  profileId: new UniqueEntityID('profile-1'),
                }),
              ]),
            )
          }
        })
        it('should`t be able if not found', async () => {
          const company = makeCompany({}, new UniqueEntityID('company-1'))
          await inMemoryCompanyRepository.create(company)
          await inMemoryCompanyTeamRepository.createMany([
            makeCompanyTeam({
              companyId: company.id,
              teamId: new UniqueEntityID('team-1'),
            }),
          ])

          const result = await sut.execute({
            companyId: 'company-2',
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
