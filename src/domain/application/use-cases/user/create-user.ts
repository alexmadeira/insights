import type { IUserRepository } from '@DOMTypes/application/repositories/user-repository'
import type {
  ICreateUserUseCase,
  TCreateUserUseCaseRequest,
  TCreateUserUseCaseResponse,
} from '@DOMTypes/application/use-cases/user/create-user'

import { left, right } from '_COR/either'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { User } from '_DOMEnt/entities/user'
import { Role } from '_DOMEnt/entities/value-objects'

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({
    teamId,
    companyId,
    role: roleCode,
    ...rest
  }: TCreateUserUseCaseRequest): Promise<TCreateUserUseCaseResponse> {
    const role = Role.create(roleCode)

    if (!role.code) {
      return left(new InvalidTypeError())
    }

    const user = User.create({
      role,
      company: companyId,
      team: teamId,
      ...rest,
    })

    await this.userRepository.create(user)

    return right({ user })
  }
}
