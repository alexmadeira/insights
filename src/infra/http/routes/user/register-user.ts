import type { RouteGroup } from '_INFCommon/route'

import { Route } from '_INFCommon/route'
import { registerByEmailController } from '_INFHttp/module/user'
import { registerByEmailSchema } from '_INFHttp/schema/user'

export const registerByEmailRoute = (routeGroup: RouteGroup) =>
  Route.post({
    routeGroup,
    path: '/register',
    summary: 'Create a new user',
    operationId: 'registerByEmail',
    description: 'Create a new user by email',
    controller: registerByEmailController,
    ...registerByEmailSchema.routeSchema,
  })
