import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditUserUseCase } from '_DOMApp/use-cases/user/edit-user'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeUser } from '_TEST/utils/factories/make-user'
import { InMemoryUserRepository } from '_TEST/utils/repositories/in-memory-user-repository'

let inMemoryUserRepository: InMemoryUserRepository
let sut: EditUserUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new EditUserUseCase(inMemoryUserRepository)
  })

  describe('Use case', () => {
    describe('User', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          await inMemoryUserRepository.create(makeUser({}, new UniqueEntityID('user-01')))

          const result = await sut.execute({
            userId: 'user-01',
            name: 'User Name',
            email: 'user@emal.com',
            role: 'owner',
            companyId: 'company-1',
            teamId: 'team-1',
          })

          expect(result.isRight()).toBe(true)
          expect(inMemoryUserRepository.itens[0]).toMatchObject({
            name: 'User Name',
            email: 'user@emal.com',
            company: 'company-1',
            team: 'team-1',
          })
        })

        it('should`t be able with an invalid role', async () => {
          await inMemoryUserRepository.create(makeUser({}, new UniqueEntityID('user-01')))

          const result = await sut.execute({
            userId: 'user-01',
            name: 'User Name',
            email: 'user@emal.com',
            role: 'invalid-role',
            companyId: 'company-1',
            teamId: 'team-1',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(InvalidTypeError)
        })

        it('should`t be able if not found', async () => {
          await inMemoryUserRepository.create(makeUser({}, new UniqueEntityID('user-01')))

          const result = await sut.execute({
            userId: 'user-02',
            name: 'User Name',
            email: 'user@emal.com',
            role: 'invalid-role',
            companyId: 'company-1',
            teamId: 'team-1',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
