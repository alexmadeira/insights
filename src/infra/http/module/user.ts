import { CreateAvatarUseCase } from '_DOMApp/use-cases/avatar/create-avatar'
import { PrismaAvatarRepository } from '_INF/database/prisma/repositories'
import { ModuleManager } from '_INFCommon/module-manager'
import { CreateByEmailController } from '_INFHttp/controller/user/create-user-by-email.controller'

const avatarRepository = ModuleManager.create(PrismaAvatarRepository)
const createAvatarUseCase = ModuleManager.create(CreateAvatarUseCase, avatarRepository)

export const createByEmailController = ModuleManager.create(CreateByEmailController, createAvatarUseCase)
