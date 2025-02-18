import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CreateMemberUseCase } from '_DOM/application/use-cases/member/create-member'
import { InMemoryMemberAvatarRepository } from '_TEST/utils/repositories/in-memory-member-avatar-repository'
import { InMemoryMemberCompanyRepository } from '_TEST/utils/repositories/in-memory-member-company-repository'
import { InMemoryMemberRepository } from '_TEST/utils/repositories/in-memory-member-repository'
import { InMemoryMemberTeamRepository } from '_TEST/utils/repositories/in-memory-member-team-repository'

let inMemoryMemberAvatarRepository: InMemoryMemberAvatarRepository
let inMemoryMemberTeamRepository: InMemoryMemberTeamRepository
let inMemoryMemberCompanyRepository: InMemoryMemberCompanyRepository
let inMemoryMemberRepository: InMemoryMemberRepository
let sut: CreateMemberUseCase

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

    sut = new CreateMemberUseCase(inMemoryMemberRepository)
  })

  describe('Use case', () => {
    describe('Member', () => {
      describe('Create', () => {
        it('should be able', async () => {
          const result = await sut.execute({
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
            expect(inMemoryMemberRepository.itens[0].slug.value).toEqual('member-name')

            expect(inMemoryMemberRepository.itens[0].teams.currentItems).toHaveLength(1)
            expect(inMemoryMemberRepository.itens[0].teams.currentItems).toEqual([
              expect.objectContaining({
                teamId: new UniqueEntityID('team-1'),
                memberId: result.value.member.id,
              }),
            ])

            expect(inMemoryMemberRepository.itens[0].avatars.currentItems).toHaveLength(1)
            expect(inMemoryMemberRepository.itens[0].avatars.currentItems).toEqual([
              expect.objectContaining({
                memberId: result.value.member.id,
                avatarId: new UniqueEntityID('avatar-1'),
              }),
            ])

            expect(inMemoryMemberRepository.itens[0].companies.currentItems).toHaveLength(1)
            expect(inMemoryMemberRepository.itens[0].companies.currentItems).toEqual([
              expect.objectContaining({
                companyId: new UniqueEntityID('company-1'),
                memberId: result.value.member.id,
              }),
            ])
          }
        })
        it('together should be able persist avatars', async () => {
          const result = await sut.execute({
            name: 'Member Name',
            email: 'member@emal.com',
            avatarsIds: ['avatar-1', 'avatar-2'],
            teamsIds: [],
            companiesIds: [],
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryMemberAvatarRepository.itens).toHaveLength(2)
          expect(inMemoryMemberAvatarRepository.itens).toEqual(
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
            name: 'Member Name',
            email: 'member@emal.com',
            teamsIds: ['team-1', 'team-2'],
            companiesIds: [],
            avatarsIds: [],
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
                  teamId: new UniqueEntityID('team-2'),
                }),
              ]),
            )
          }
        })
        it('together should be able persist companies', async () => {
          const result = await sut.execute({
            name: 'Member Name',
            email: 'member@emal.com',
            companiesIds: ['company-1', 'company-2'],
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
                  companyId: new UniqueEntityID('company-2'),
                }),
              ]),
            )
          }
        })
      })
    })
  })
})
