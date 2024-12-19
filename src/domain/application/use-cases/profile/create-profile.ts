import type { ProfileRepository } from '_DOMApp/repositories/profile-repository'
import type {
  ICreateProfileUseCase,
  TCreateProfileUseCaseRequest,
  TCreateProfileUseCaseResponse,
} from '@DOMTypes/application/use-cases/profile/create-profile'

import { right } from '_COR/either'
import { Profile } from '_DOMEnt/entities/profile'

export class CreateProfileUseCase implements ICreateProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute({
    networkId,
    referencesIds,
    ...rest
  }: TCreateProfileUseCaseRequest): Promise<TCreateProfileUseCaseResponse> {
    const profile = Profile.create({
      network: networkId,
      references: referencesIds,
      ...rest,
    })

    await this.profileRepository.create(profile)

    return right({ profile })
  }
}
