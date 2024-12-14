import type { IProfileRepository } from '@DOMTypes/application/repositories/profile-repository'
import type {
  ICreateProfileUseCase,
  TCreateProfileUseCaseRequest,
  TCreateProfileUseCaseResponse,
} from '@DOMTypes/application/use-cases/profile/create-profile'

import { right } from '_COR/either'
import { Profile } from '_DOMEnt/entities/profile'

export class CreateProfileUseCase implements ICreateProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute({ ...props }: TCreateProfileUseCaseRequest): Promise<TCreateProfileUseCaseResponse> {
    const profile = Profile.create({ ...props })

    await this.profileRepository.create(profile)

    return right({ profile })
  }
}
