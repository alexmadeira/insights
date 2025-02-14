import { AuthenticateUserUseCase } from '_DOMApp/use-cases/user/authenticate-user'
import { RegisterUserUseCase } from '_DOMApp/use-cases/user/register-user'
import { PrismaService } from '_INF/database/prisma/prisma-service'
import { PrismaUserRepository } from '_INF/database/prisma/repositories/prisma-user-repository'
import { BcryptHasher } from '_INF/services/cryptography/bcrypt-hasher'
import { JwtEncrypter } from '_INF/services/cryptography/jwt-encrypter'
import { ModuleManager } from '_INFCommon/module-manager'

import { AuthenticateByIndetifierController } from '../controller/user/authenticate-user'
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
