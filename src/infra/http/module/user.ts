import { AuthenticateUserUseCase } from '_DOMApp/use-cases/user/authenticate-user'
import { RegisterUserUseCase } from '_DOMApp/use-cases/user/register-user'
import { PrismaService } from '_INF/database/prisma'
import { PrismaUserRepository } from '_INF/database/prisma/repositories'
import { BcryptHasher } from '_INFServices/cryptography/bcrypt-hasher'
import { JwtEncrypter } from '_INFServices/cryptography/jwt-encrypter'
import { ModuleManager } from '_INFServices/module-manager'

import { AuthenticateByIndetifierController } from '../controller/user/authenticate-user-by-indetifier'
import { RegisterByEmailController } from '../controller/user/register-user-by-email'

const userRepository = ModuleManager.create(PrismaUserRepository, PrismaService)

const registerUserUseCase = ModuleManager.create(RegisterUserUseCase, userRepository, BcryptHasher)
const authenticateUserUseCase = ModuleManager.create(
  AuthenticateUserUseCase,
  userRepository,
  BcryptHasher,
  JwtEncrypter,
)

export const registerByEmailController = ModuleManager.create(RegisterByEmailController, registerUserUseCase)
export const authenticateByIndetifierController = ModuleManager.create(
  AuthenticateByIndetifierController,
  authenticateUserUseCase,
)
