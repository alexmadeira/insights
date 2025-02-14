import type { TFastifyInstance } from '@INFTypes/http/config/fastify'

import { RouteGroup } from '_INFCommon/route'

import { createByEmailRoute } from './create-user'

const routeGroup = RouteGroup.create('user')

export async function avatarRoutes(fastify: TFastifyInstance) {
  fastify.register(createByEmailRoute(routeGroup).register)
}
