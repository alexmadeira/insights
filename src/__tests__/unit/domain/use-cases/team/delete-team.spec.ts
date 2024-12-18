import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { DeleteTeamUseCase } from '_DOMApp/use-cases/team/delete-team'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeTeam } from '_TEST/utils/factories/make-team'
import { InMemoryTeamRepository } from '_TEST/utils/repositories/in-memory-team-repository'

let inMemoryTeamRepository: InMemoryTeamRepository
let sut: DeleteTeamUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryTeamRepository = new InMemoryTeamRepository()
    sut = new DeleteTeamUseCase(inMemoryTeamRepository)
  })

  describe('Use case', () => {
    describe('Team', () => {
      describe('Delete', () => {
        it('should be able', async () => {
          await inMemoryTeamRepository.create(makeTeam({}, new UniqueEntityID('team-01')))

          const result = await sut.execute({
            teamId: 'team-01',
          })
          expect(result.isRight()).toBe(true)
          expect(inMemoryTeamRepository.itens).toHaveLength(0)
        })

        it('should`t be able if not found', async () => {
          await inMemoryTeamRepository.create(makeTeam({}, new UniqueEntityID('team-01')))

          const result = await sut.execute({
            teamId: 'team-02',
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
