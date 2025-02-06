import { CreateAvatarUseCase } from '_DOMApp/use-cases/avatar/create-avatar'
import { PrismaAvatarRepository } from '_INF/database/prisma/repositories'
import { ModuleManager } from '_INFCommon/module-manager'
import { CreateAvatarController } from '_INFHttp/controller/avatar/create-avatar.controller'

const avatarRepository = ModuleManager.create(PrismaAvatarRepository)
const createAvatarUseCase = ModuleManager.create(CreateAvatarUseCase, avatarRepository)

export const createAvatarController = ModuleManager.create(CreateAvatarController, createAvatarUseCase)
