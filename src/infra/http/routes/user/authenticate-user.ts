import { authenticateByIndetifierController } from '_INF/http/module'
import { authenticateByIndetifierSchema } from '_INF/http/schema/user'
import { Route } from '_INF/services/route'

export const authenticateByIndetifierRoute = Route.post({
  path: '/auth-indetifier',
  summary: 'Authenticate a user',
  operationId: 'authenticateByIndetifier',
  description: 'Authenticate a user by indetifier and password',
  controller: authenticateByIndetifierController,
  ...authenticateByIndetifierSchema.routeSchema,
})
