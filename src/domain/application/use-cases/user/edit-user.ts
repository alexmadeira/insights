import type { IUserRepository } from '@DOMTypes/application/repositories/user-repository'
import type {
  IEditUserUseCase,
  TEditUserUseCaseRequest,
  TEditUserUseCaseResponse,
} from '@DOMTypes/application/use-cases/user/edit-user'

import { left, right } from '_COR/either'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { Role } from '_DOMEnt/entities/value-objects'

export class EditUserUseCase implements IEditUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({
    userId,
    name,
    email,
    teamId,
    companyId,
    role: roleCode,
  }: TEditUserUseCaseRequest): Promise<TEditUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const role = Role.create(roleCode)

    if (!role.code) {
      return left(new InvalidTypeError())
    }

    user.name = name
    user.email = email
    user.role = role
    user.team = teamId
    user.company = companyId

    await this.userRepository.save(user)

    return right({ user })
  }
}
