import { registerByEmailController } from '_INF/http/module'
import { registerByEmailSchema } from '_INF/http/schema/user'
import { Route } from '_INF/services/route'

export const registerByEmailRoute = Route.post({
  path: '/register',
  summary: 'Create a new user',
  operationId: 'registerByEmail',
  description: 'Create a new user by email',
  controller: registerByEmailController,
  ...registerByEmailSchema.routeSchema,
})
