import { registerByEmailController } from '_INFHttp/module'
import { registerByEmailSchema } from '_INFHttp/schema/user'
import { Route } from '_INFServices/route'

export const registerByEmailRoute = Route.post({
  path: '/register',
  summary: 'Create a new user',
  operationId: 'registerByEmail',
  description: 'Create a new user by email',
  controller: registerByEmailController,
  ...registerByEmailSchema.routeSchema,
})
