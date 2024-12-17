import type { IProfileRepository } from '@DOMTypes/application/repositories/profile-repository'
import type {
  IEditProfileUseCase,
  TEditProfileUseCaseRequest,
  TEditProfileUseCaseResponse,
} from '@DOMTypes/application/use-cases/profile/edit-profile'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

export class EditProfileUseCase implements IEditProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute({
    profileId,
    name,
    networkId,
    referencesIds,
  }: TEditProfileUseCaseRequest): Promise<TEditProfileUseCaseResponse> {
    const profile = await this.profileRepository.findById(profileId)

    if (!profile) {
      return left(new ResourceNotFoundError())
    }

    profile.name = name
    profile.network = networkId
    profile.references = referencesIds

    await this.profileRepository.save(profile)

    return right({ profile })
  }
}
