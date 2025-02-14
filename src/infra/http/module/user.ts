import { RegisterUserUseCase } from '_DOMApp/use-cases/user/register-user'
import { PrismaService } from '_INF/database/prisma/prisma-service'
import { PrismaUserRepository } from '_INF/database/prisma/repositories/prisma-user-repository'
import { BcryptHasher } from '_INF/services/cryptography/bcrypt-hasher'
import { ModuleManager } from '_INFCommon/module-manager'
import { CreateByEmailController } from '_INFHttp/controller/user/create-user-by-email.controller'

const userRepository = ModuleManager.create(PrismaUserRepository, PrismaService)
const createAvatarUseCase = ModuleManager.create(RegisterUserUseCase, userRepository, BcryptHasher)

export const createByEmailController = ModuleManager.create(CreateByEmailController, createAvatarUseCase)
