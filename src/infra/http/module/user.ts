import { AuthenticateUserUseCase } from '_DOMApp/use-cases/user/authenticate-user'
import { RegisterUserUseCase } from '_DOMApp/use-cases/user/register-user'
import { PrismaService } from '_INF/database/prisma'
import { PrismaUserRepository } from '_INF/database/prisma/repositories'
import { ModuleManager } from '_INFServices/module-manager'

import { AuthenticateByIndetifierController } from '../controller/user/authenticate-user-by-indetifier'
import { RegisterByEmailController } from '../controller/user/register-user-by-email'

import { encrypter, hasher } from './auth'

export const userRepository = ModuleManager.create(PrismaUserRepository, PrismaService)

export const registerUserUseCase = ModuleManager.create(RegisterUserUseCase, userRepository, hasher)
export const authenticateUserUseCase = ModuleManager.create(AuthenticateUserUseCase, userRepository, hasher, encrypter)

export const registerByEmailController = ModuleManager.create(RegisterByEmailController, registerUserUseCase)
export const authenticateByIndetifierController = ModuleManager.create(
  AuthenticateByIndetifierController,
  authenticateUserUseCase,
)
