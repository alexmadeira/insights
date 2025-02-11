import type { TFastifyInstance } from '@INFTypes/http/config/fastify'

import { RouteGroup } from '_INFCommon/route'

import { createAvatarRoute } from './create-avatar'

const routeGroup = RouteGroup.create('avatar')

export async function avatarRoutes(fastify: TFastifyInstance) {
  fastify.register(createAvatarRoute(routeGroup).register)
}
