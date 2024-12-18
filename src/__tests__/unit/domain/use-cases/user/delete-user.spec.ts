import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { DeleteUserUseCase } from '_DOMApp/use-cases/user/delete-user'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeUser } from '_TEST/utils/factories/make-user'
import { makeUserTeam } from '_TEST/utils/factories/make-user-team'
import { InMemoryUserRepository } from '_TEST/utils/repositories/in-memory-user-repository'
import { InMemoryUserTeamRepository } from '_TEST/utils/repositories/in-memory-user-team-repository'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUserTeamRepository: InMemoryUserTeamRepository
let sut: DeleteUserUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryUserTeamRepository = new InMemoryUserTeamRepository()
    inMemoryUserRepository = new InMemoryUserRepository(inMemoryUserTeamRepository)
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  describe('Use case', () => {
    describe('User', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          const user = makeUser({}, new UniqueEntityID('user-01'))
          await inMemoryUserRepository.create(makeUser({}, new UniqueEntityID('user-01')))
          await inMemoryUserTeamRepository.createMany(
            makeUserTeam({
              userId: user.id,
              teamId: new UniqueEntityID('team-1'),
            }),
            makeUserTeam({
              userId: user.id,
              teamId: new UniqueEntityID('team-2'),
            }),
          )

          const result = await sut.execute({
            userId: 'user-01',
          })

          console.log(inMemoryUserTeamRepository.itens)
          expect(result.isRight()).toBe(true)
          expect(inMemoryUserRepository.itens).toHaveLength(0)
          // expect(inMemoryUserTeamRepository.itens).toHaveLength(0)
        })

        it('should`t be able if not found', async () => {
          await inMemoryUserRepository.create(makeUser({}, new UniqueEntityID('user-01')))

          const result = await sut.execute({
            userId: 'user-02',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
