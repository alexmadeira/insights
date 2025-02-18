import type { UserRepository } from '_DOM/application/repositories/user-repository'
import type { HashGenerator } from '_DOM/application/services/cryptography/hash-generator'
import type {
  IRegisterUserUseCase,
  TRegisterUserUseCaseRequest,
  TRegisterUserUseCaseResponse,
} from '@DOMTypes/application/use-cases/user/register-user'

import { left, right } from '_COR/either'
import { User } from '_DOM/enterprise/entities/user'

import { UserAlreadyExistisError } from '../_errors/user-already-existis-error'

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({ password, ...props }: TRegisterUserUseCaseRequest): Promise<TRegisterUserUseCaseResponse> {
    const userWithSameIndetifier = await this.userRepository.findByIndetifier(props.indetifier)

    if (userWithSameIndetifier) return left(new UserAlreadyExistisError(props.indetifier))

    const passwordHash = await this.hashGenerator.hash(password)

    const user = User.create({ ...props, hash: passwordHash })
    await this.userRepository.create(user)
    return right({ user })
  }
}
