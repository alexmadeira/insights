import type { ProfileRepository } from '_DOM/application/repositories/profile-repository'
import type {
  ICreateProfileUseCase,
  TCreateProfileUseCaseRequest,
  TCreateProfileUseCaseResponse,
} from '@DOMTypes/application/use-cases/profile/create-profile'

import { right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Connection } from '_DOM/enterprise/entities/connection'
import { Profile } from '_DOM/enterprise/entities/profile'
import { ProfileReferenceList } from '_DOM/enterprise/entities/profile-reference-list'

export class CreateProfileUseCase implements ICreateProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute({
    networkId,
    connectionCode,
    connectionToken,
    referencesIds,
    ...props
  }: TCreateProfileUseCaseRequest): Promise<TCreateProfileUseCaseResponse> {
    const connection = Connection.create({
      code: connectionCode,
      token: connectionToken,
    })

    const profile = Profile.create({
      ...props,
      connection,
      network: new UniqueEntityID(networkId),
    })

    profile.references = ProfileReferenceList.create(profile.id, referencesIds)

    await this.profileRepository.create(profile)

    return right({ profile })
  }
}
