import type { ProfileReferenceRepository } from '_DOMApp/repositories/profile-reference-repository'
import type { ProfileRepository } from '_DOMApp/repositories/profile-repository'
import type {
  IEditProfileUseCase,
  TEditProfileUseCaseRequest,
  TEditProfileUseCaseResponse,
} from '@DOMTypes/application/use-cases/profile/edit-profile'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'
import { ProfileReference } from '_DOMEnt/entities/profile-reference'
import { ProfileReferenceList } from '_DOMEnt/entities/profile-reference-list'

export class EditProfileUseCase implements IEditProfileUseCase {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly profileReferenceRepository: ProfileReferenceRepository,
  ) {}

  async execute({
    profileId,
    name,
    networkId,
    referencesIds,
  }: TEditProfileUseCaseRequest): Promise<TEditProfileUseCaseResponse> {
    const profile = await this.profileRepository.findById(profileId)
    if (!profile) return left(new ResourceNotFoundError())

    const references = await this.profileReferenceRepository.findManyByProfileId(profileId)

    const profileReferenceList = new ProfileReferenceList(references)

    profileReferenceList.update(
      referencesIds.map((referenceId) =>
        ProfileReference.create({
          profileId: profile.id,
          referenceId: new UniqueEntityID(referenceId),
        }),
      ),
    )

    profile.name = name
    profile.network = new UniqueEntityID(networkId)
    profile.references = profileReferenceList

    await this.profileRepository.save(profile)

    return right({ profile })
  }
}
