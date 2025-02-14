import type { RouteGroup } from '_INFCommon/route'

import { Route } from '_INFCommon/route'
import { createByEmailController } from '_INFHttp/module/user'
import { createByEmailSchema } from '_INFHttp/schema/user/create-by-email'

export const createByEmailRoute = (routeGroup: RouteGroup) =>
  Route.post({
    routeGroup,
    summary: 'Create a new user',
    description: 'Create a new user by email',
    controller: createByEmailController,
    ...createByEmailSchema.routeSchema,
  })
