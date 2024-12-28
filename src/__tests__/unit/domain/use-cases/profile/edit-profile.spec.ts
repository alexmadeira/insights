import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { EditProfileUseCase } from '_DOMApp/use-cases/profile/edit-profile'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { makeProfile } from '_TEST/utils/factories/make-profile'
import { makeProfileReference } from '_TEST/utils/factories/make-profile-reference'
import { InMemoryProfileReferenceRepository } from '_TEST/utils/repositories/in-memory-profile-reference-repository'
import { InMemoryProfileRepository } from '_TEST/utils/repositories/in-memory-profile-repository'

let inMemoryProfileReferenceRepository: InMemoryProfileReferenceRepository
let inMemoryProfileRepository: InMemoryProfileRepository

let sut: EditProfileUseCase

describe('Domain', () => {
  beforeEach(() => {
    inMemoryProfileReferenceRepository = new InMemoryProfileReferenceRepository()
    inMemoryProfileRepository = new InMemoryProfileRepository(inMemoryProfileReferenceRepository)

    sut = new EditProfileUseCase(inMemoryProfileRepository, inMemoryProfileReferenceRepository)
  })

  describe('Use case', () => {
    describe('Profile', () => {
      describe('Edit', () => {
        it('should be able', async () => {
          await inMemoryProfileRepository.create(makeProfile({}, new UniqueEntityID('profile-1')))

          const result = await sut.execute({
            profileId: 'profile-1',
            name: 'Profile Name',
            networkId: 'network-1',
            referencesIds: ['reference-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryProfileRepository.itens[0].name).toEqual('Profile Name')
            expect(inMemoryProfileRepository.itens[0].network.toString()).toEqual('network-1')
          }
        })
        it('should be able sync references', async () => {
          const profile = makeProfile({}, new UniqueEntityID('profile-1'))
          await inMemoryProfileRepository.create(profile)
          await inMemoryProfileReferenceRepository.createMany([
            makeProfileReference({
              profileId: profile.id,
              referenceId: new UniqueEntityID('reference-1'),
            }),
            makeProfileReference({
              profileId: profile.id,
              referenceId: new UniqueEntityID('reference-2'),
            }),
          ])

          const result = await sut.execute({
            profileId: 'profile-1',
            name: 'Profile Name',
            networkId: 'network-1',
            referencesIds: ['reference-4', 'reference-1'],
          })

          expect(result.isRight()).toBe(true)
          if (result.isRight()) {
            expect(inMemoryProfileReferenceRepository.itens).toHaveLength(2)
            expect(inMemoryProfileReferenceRepository.itens).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  profileId: result.value.profile.id,
                  referenceId: new UniqueEntityID('reference-4'),
                }),
                expect.objectContaining({
                  profileId: result.value.profile.id,
                  referenceId: new UniqueEntityID('reference-1'),
                }),
              ]),
            )
          }
        })
        it("should't be able if not found", async () => {
          await inMemoryProfileRepository.create(makeProfile({}, new UniqueEntityID('profile-1')))

          const result = await sut.execute({
            profileId: 'profile-2',
            name: 'Profile Name',
            networkId: 'network-1',
            referencesIds: [],
          })

          expect(result.isLeft()).toBe(true)
          expect(result.value).toBeInstanceOf(ResourceNotFoundError)
        })
      })
    })
  })
})
