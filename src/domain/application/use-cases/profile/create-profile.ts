import type { ProfileRepository } from '_DOMApp/repositories/profile-repository'
import type {
  ICreateProfileUseCase,
  TCreateProfileUseCaseRequest,
  TCreateProfileUseCaseResponse,
} from '@DOMTypes/application/use-cases/profile/create-profile'

import { right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Profile } from '_DOMEnt/entities/profile'
import { ProfileReferenceList } from '_DOMEnt/entities/profile-reference-list'

export class CreateProfileUseCase implements ICreateProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute({
    networkId,
    referencesIds,
    ...props
  }: TCreateProfileUseCaseRequest): Promise<TCreateProfileUseCaseResponse> {
    const profile = Profile.create({
      ...props,
      network: new UniqueEntityID(networkId),
    })

    profile.references = ProfileReferenceList.create(profile.id, referencesIds)

    await this.profileRepository.create(profile)

    return right({ profile })
  }
}
