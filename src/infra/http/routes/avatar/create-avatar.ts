import type { RouteGroup } from '_INFCommon/route'

import { Route } from '_INFCommon/route'
import { createAvatarController } from '_INFHttp/module/avatar'
import { avatarCreateSchema } from '_INFHttp/schema/avatar-create'

export const createAvatarRoute = (routeGroup: RouteGroup) =>
  Route.post({
    routeGroup,
    summary: 'summary'.toUpperCase() + ': Create a new unlinked avatar',
    description: 'description'.toUpperCase() + ': Create a new unlinked avatar',
    controller: createAvatarController,
    ...avatarCreateSchema.routeSchema,
  })
