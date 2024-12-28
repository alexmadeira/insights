import type { ProfileRepository } from '_DOMApp/repositories/profile-repository'
import type {
  IDeleteProfileUseCase,
  TDeleteProfileUseCaseRequest,
  TDeleteProfileUseCaseResponse,
} from '@DOMTypes/application/use-cases/profile/delete-profile'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

export class DeleteProfileUseCase implements IDeleteProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute({ profileId }: TDeleteProfileUseCaseRequest): Promise<TDeleteProfileUseCaseResponse> {
    const profile = await this.profileRepository.findById(profileId)
    if (!profile) return left(new ResourceNotFoundError())

    await this.profileRepository.delete(profile)

    return right(null)
  }
}
