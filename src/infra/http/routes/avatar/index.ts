import { CreateAvatarUseCase } from '_DOMApp/use-cases/avatar/create-avatar'
import { PrismaService } from '_INF/database/prisma/prisma-service'
import { PrismaAvatarRepository } from '_INF/database/prisma/repositories'
import { ModuleManager } from '_INFCommon/module-manager'
import { Route } from '_INFCommon/routes/route'
import { CreateAvatarController } from '_INFHttp/controller/avatar/create-avatar.controller'

import { create } from './schemas'

export const avatarRoutes = new Route('/avatar')

const avatarRepository = ModuleManager.create(PrismaAvatarRepository, PrismaService)
const createAvatarUseCase = ModuleManager.create(CreateAvatarUseCase, avatarRepository)
const createAvatarController = ModuleManager.create(CreateAvatarController, createAvatarUseCase)

avatarRoutes.post(
  {
    tags: ['avatar'],
    summary: 'Resumo da rota de busca de usuário',
    description: 'Descrição da rota de busca de usuário',
    body: create.body,
    response: create.response,
  },
  createAvatarController,
)
