import type { RouteGroup } from '_INFCommon/route'

import { Route } from '_INFCommon/route'
import { authenticateByIndetifierController } from '_INFHttp/module/user'
import { authenticateByIndetifierSchema } from '_INFHttp/schema/user'

export const authenticateByIndetifierRoute = (routeGroup: RouteGroup) =>
  Route.post({
    routeGroup,
    path: '/auth-indetifier',
    summary: 'Authenticate a user',
    operationId: 'authenticateByIndetifier',
    description: 'Authenticate a user by indetifier and password',
    controller: authenticateByIndetifierController,
    ...authenticateByIndetifierSchema.routeSchema,
  })
