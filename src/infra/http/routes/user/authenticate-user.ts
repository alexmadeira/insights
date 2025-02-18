import { authenticateByIndetifierController } from '_INFHttp/module'
import { authenticateByIndetifierSchema } from '_INFHttp/schema/user'
import { Route } from '_INFServices/route'

export const authenticateByIndetifierRoute = Route.post({
  path: '/auth-indetifier',
  summary: 'Authenticate a user',
  operationId: 'authenticateByIndetifier',
  description: 'Authenticate a user by indetifier and password',
  controller: authenticateByIndetifierController,
  ...authenticateByIndetifierSchema.routeSchema,
})
