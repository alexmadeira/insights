import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CreateCompanyUseCase } from '_DOM/application/use-cases/company/create-company'
import { MemberRole } from '_DOM/enterprise/entities/value-objects'
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

let sut: CreateCompanyUseCase

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

    sut = new CreateCompanyUseCase(inMemoryCompanyRepository)
  })

  describe('Use case', () => {
    describe('Company', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
            name: 'Company Name',
            teamsIds: ['team-1'],
            avatarsIds: ['avatar-1'],
            membersRoles: [['member-1', 'owner']],
            profilesIds: ['profile-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryCompanyRepository.itens[0].name).toEqual('Company Name')
            expect(inMemoryCompanyRepository.itens[0].slug.value).toEqual('company-name')
            expect(inMemoryCompanyRepository.itens[0].teams.currentItems).toHaveLength(1)
            expect(inMemoryCompanyRepository.itens[0].teams.currentItems).toEqual([
              expect.objectContaining({
                companyId: result.value.company.id,
                teamId: new UniqueEntityID('team-1'),
              }),
            ])
            expect(inMemoryCompanyRepository.itens[0].avatars.currentItems).toHaveLength(1)
            expect(inMemoryCompanyRepository.itens[0].avatars.currentItems).toEqual([
              expect.objectContaining({
                companyId: result.value.company.id,
                avatarId: new UniqueEntityID('avatar-1'),
              }),
            ])
            expect(inMemoryCompanyRepository.itens[0].members.currentItems).toHaveLength(1)
            expect(inMemoryCompanyRepository.itens[0].members.currentItems).toEqual([
              expect.objectContaining({
                companyId: result.value.company.id,
                member: new MemberRole('member-1', 'owner'),
              }),
            ])
            expect(inMemoryCompanyRepository.itens[0].profiles.currentItems).toHaveLength(1)
            expect(inMemoryCompanyRepository.itens[0].profiles.currentItems).toEqual([
              expect.objectContaining({
                companyId: result.value.company.id,
                profileId: new UniqueEntityID('profile-1'),
              }),
            ])
          }
        })
        it('together should be able persist avatar', async () => {
          const result = await sut.execute({
            name: 'Company Name',
            teamsIds: [],
            avatarsIds: ['avatar-1', 'avatar-2'],
            profilesIds: [],
            membersRoles: [],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryCompanyAvatarRepository.itens).toHaveLength(2)
          expect(inMemoryCompanyAvatarRepository.itens).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                avatarId: new UniqueEntityID('avatar-1'),
              }),
              expect.objectContaining({
                avatarId: new UniqueEntityID('avatar-2'),
              }),
            ]),
          )
        })
        it('together should be able persist teams', async () => {
          const result = await sut.execute({
            name: 'Company Name',
            teamsIds: ['team-1', 'team-2'],
            avatarsIds: [],
            profilesIds: [],
            membersRoles: [],
          })

          expect(result.isRight()).toBe(true)
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
        })
        it('together should be able persist members', async () => {
          const result = await sut.execute({
            name: 'Company Name',
            membersRoles: [
              ['member-1', 'owner'],
              ['member-2', 'member'],
            ],
            teamsIds: [],
            avatarsIds: [],
            profilesIds: [],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryCompanyMemberRepository.itens).toHaveLength(2)
          expect(inMemoryCompanyMemberRepository.itens).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                member: new MemberRole('member-1', 'owner'),
              }),
              expect.objectContaining({
                member: new MemberRole('member-2', 'member'),
              }),
            ]),
          )
        })
        it('together should be able persist profiles', async () => {
          const result = await sut.execute({
            name: 'Company Name',
            profilesIds: ['profile-1', 'profile-2'],
            teamsIds: [],
            avatarsIds: [],
            membersRoles: [],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryCompanyProfileRepository.itens).toHaveLength(2)
          expect(inMemoryCompanyProfileRepository.itens).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                profileId: new UniqueEntityID('profile-1'),
              }),
              expect.objectContaining({
                profileId: new UniqueEntityID('profile-2'),
              }),
            ]),
          )
        })
      })
    })
  })
})
