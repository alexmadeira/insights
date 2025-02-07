import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'
import { EditMemberUseCase } from '_DOMApp/use-cases/member/edit-member'
import { makeMember } from '_TEST/utils/factories/domain/make-member'
import { makeMemberCompany } from '_TEST/utils/factories/domain/make-member-company'
import { makeMemberTeam } from '_TEST/utils/factories/domain/make-member-team'
import { InMemoryMemberAvatarRepository } from '_TEST/utils/repositories/in-memory-member-avatar-repository'
import { InMemoryMemberCompanyRepository } from '_TEST/utils/repositories/in-memory-member-company-repository'
import { InMemoryMemberRepository } from '_TEST/utils/repositories/in-memory-member-repository'
import { InMemoryMemberTeamRepository } from '_TEST/utils/repositories/in-memory-member-team-repository'

let inMemoryMemberTeamRepository: InMemoryMemberTeamRepository
let inMemoryMemberAvatarRepository: InMemoryMemberAvatarRepository
let inMemoryMemberCompanyRepository: InMemoryMemberCompanyRepository
let inMemoryMemberRepository: InMemoryMemberRepository

let sut: EditMemberUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryMemberAvatarRepository = new InMemoryMemberAvatarRepository()
    inMemoryMemberTeamRepository = new InMemoryMemberTeamRepository()
    inMemoryMemberCompanyRepository = new InMemoryMemberCompanyRepository()
    inMemoryMemberRepository = new InMemoryMemberRepository(
      inMemoryMemberAvatarRepository,
      inMemoryMemberTeamRepository,
      inMemoryMemberCompanyRepository,
    )

    sut = new EditMemberUseCase(
      inMemoryMemberRepository,
      inMemoryMemberTeamRepository,
      inMemoryMemberAvatarRepository,
      inMemoryMemberCompanyRepository,
    )
  })

  describe('Use case', () => {
    describe('Member', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          await inMemoryMemberRepository.create(makeMember({}, new UniqueEntityID('member-1')))

          const result = await sut.execute({
            memberId: 'member-1',
            name: 'Member Name',
            email: 'member@emal.com',
            teamsIds: ['team-1'],
            avatarsIds: ['avatar-1'],
            companiesIds: ['company-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryMemberRepository.itens[0].name).toEqual('Member Name')
            expect(inMemoryMemberRepository.itens[0].email).toEqual('member@emal.com')

            expect(inMemoryMemberRepository.itens[0].teams.currentItems).toHaveLength(1)
            expect(inMemoryMemberRepository.itens[0].teams.currentItems).toEqual([
              expect.objectContaining({ memberId: result.value.member.id, teamId: new UniqueEntityID('team-1') }),
            ])

            expect(inMemoryMemberRepository.itens[0].avatars.currentItems).toHaveLength(1)
            expect(inMemoryMemberRepository.itens[0].avatars.currentItems).toEqual([
              expect.objectContaining({ memberId: result.value.member.id, avatarId: new UniqueEntityID('avatar-1') }),
            ])

            expect(inMemoryMemberRepository.itens[0].companies.currentItems).toHaveLength(1)
            expect(inMemoryMemberRepository.itens[0].companies.currentItems).toEqual([
              expect.objectContaining({ memberId: result.value.member.id, companyId: new UniqueEntityID('company-1') }),
            ])
          }
        })
        it('should be able sync teams', async () => {
          const member = makeMember({}, new UniqueEntityID('member-1'))
          await inMemoryMemberRepository.create(member)
          await inMemoryMemberTeamRepository.createMany([
            makeMemberTeam({
              memberId: member.id,
              teamId: new UniqueEntityID('team-1'),
            }),
            makeMemberTeam({
              memberId: member.id,
              teamId: new UniqueEntityID('team-2'),
            }),
          ])

          const result = await sut.execute({
            memberId: 'member-1',
            name: 'Member Name',
            email: 'member@emal.com',
            teamsIds: ['team-1', 'team-3'],
            avatarsIds: [],
            companiesIds: [],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryMemberTeamRepository.itens).toHaveLength(2)
            expect(inMemoryMemberTeamRepository.itens).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  teamId: new UniqueEntityID('team-1'),
                }),
                expect.objectContaining({
                  teamId: new UniqueEntityID('team-3'),
                }),
              ]),
            )
          }
        })
        it('should be able sync companies', async () => {
          const member = makeMember({}, new UniqueEntityID('member-1'))
          await inMemoryMemberRepository.create(member)
          await inMemoryMemberCompanyRepository.createMany([
            makeMemberCompany({
              memberId: member.id,
              companyId: new UniqueEntityID('company-1'),
            }),
            makeMemberCompany({
              memberId: member.id,
              companyId: new UniqueEntityID('company-2'),
            }),
          ])

          const result = await sut.execute({
            memberId: 'member-1',
            name: 'Member Name',
            email: 'member@emal.com',
            companiesIds: ['company-1', 'company-3'],
            teamsIds: [],
            avatarsIds: [],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryMemberCompanyRepository.itens).toHaveLength(2)
            expect(inMemoryMemberCompanyRepository.itens).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  companyId: new UniqueEntityID('company-1'),
                }),
                expect.objectContaining({
                  companyId: new UniqueEntityID('company-3'),
                }),
              ]),
            )
          }
        })
        it("should't be able if not found", async () => {
          await inMemoryMemberRepository.create(makeMember({}, new UniqueEntityID('member-1')))

          const result = await sut.execute({
            memberId: 'member-2',
            name: 'Member Name',
            email: 'member@emal.com',
            teamsIds: [],
            avatarsIds: [],
            companiesIds: [],
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
