import { ModuleManager } from '_COR/http/module-manager'
import { Route } from '_COR/http/routes/route'
import { GetUserController } from '_INFHttp/controller/user/get-user.controller'
import { InMemoryCompanyAvatarRepository } from '_TEST/utils/repositories/in-memory-company-avatar-repository'
import { userBody } from '@INFTypes/http/routes/user/post'

export const userRoutes = new Route('/user')

userRoutes.post(
  {
    tags: ['User'],
    summary: 'Resumo da rota de busca de usuário',
    description: 'Descrição da rota de busca de usuário',
    body: userBody,
  },
  ModuleManager.create(GetUserController, InMemoryCompanyAvatarRepository),
)
