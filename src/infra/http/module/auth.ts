import { AuthenticateUserUseCase } from '_DOM/application/use-cases/user/authenticate-user'
import { RegisterUserUseCase } from '_DOM/application/use-cases/user/register-user'
import { PrismaService } from '_INF/database/prisma'
import { PrismaUserRepository } from '_INF/database/prisma/repositories'
import { env } from '_INF/env'
import { VerifyJwt } from '_INF/http/pipes'
import { BcryptHasher } from '_INF/services/cryptography/bcrypt-hasher'
import { JwtEncrypter } from '_INF/services/cryptography/jwt-encrypter'
import { ModuleManager } from '_INF/services/module-manager'

import { AuthenticateByIndetifierController } from '../controller/user/authenticate-user-by-indetifier'
import { RegisterByEmailController } from '../controller/user/register-user-by-email'

export const hasher = ModuleManager.create(BcryptHasher)
export const encrypter = ModuleManager.create(
  JwtEncrypter,
  Buffer.from(env.JWT_PRIVATE_KEY, 'base64'),
  Buffer.from(env.JWT_PUBLIC_KEY, 'base64'),
)

export const verifyJwt = ModuleManager.create(VerifyJwt, encrypter)

export const userRepository = ModuleManager.create(PrismaUserRepository, PrismaService)

export const registerUserUseCase = ModuleManager.create(RegisterUserUseCase, userRepository, hasher)
export const authenticateUserUseCase = ModuleManager.create(AuthenticateUserUseCase, userRepository, hasher, encrypter)

export const registerByEmailController = ModuleManager.create(RegisterByEmailController, registerUserUseCase)
export const authenticateByIndetifierController = ModuleManager.create(
  AuthenticateByIndetifierController,
  authenticateUserUseCase,
)
