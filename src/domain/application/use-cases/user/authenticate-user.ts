import type { UserRepository } from '_DOMApp/repositories/user-repository'
import type {
  IAuthenticateUserUseCase,
  TAuthenticateUserUseCaseRequest,
  TAuthenticateUserUseCaseResponse,
} from '@DOMTypes/application/use-cases/user/authenticate-user'

import { left, right } from '_COR/either'
import { Encrypter } from '_DOMApp/services/cryptography/encrypter'
import { HashComparer } from '_DOMApp/services/cryptography/hash-comparer'

import { UserWrongCredentialsError } from '../_errors/user-wrong-credentials-error'

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async execute({ password, ...props }: TAuthenticateUserUseCaseRequest): Promise<TAuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByIndetifier(props.indetifier)
    if (!user) return left(new UserWrongCredentialsError())

    const isPasswordValid = await this.hashComparer.compare(password, user.hash)

    if (!isPasswordValid) return left(new UserWrongCredentialsError())

    const accessToken = await this.encrypter.encrypt({ sub: user.id.toString() })

    return right({ accessToken })
  }
}
