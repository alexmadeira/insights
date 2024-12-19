import type { UserRepository } from '_DOMApp/repositories/user-repository'
import type {
  IDeleteUserUseCase,
  TDeleteUserUseCaseRequest,
  TDeleteUserUseCaseResponse,
} from '@DOMTypes/application/use-cases/user/delete-user'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ userId }: TDeleteUserUseCaseRequest): Promise<TDeleteUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    await this.userRepository.delete(user)

    return right(null)
  }
}
