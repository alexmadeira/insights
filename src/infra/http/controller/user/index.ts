import { ModuleManager } from '_COR/http/ModuleManager'
import { InMemoryCompanyAvatarRepository } from '_TEST/utils/repositories/in-memory-company-avatar-repository'

import { GetUserController } from './get-user.controller'

export const getUserController = ModuleManager.create(GetUserController, InMemoryCompanyAvatarRepository)
