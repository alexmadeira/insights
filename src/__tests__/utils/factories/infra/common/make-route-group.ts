import { RouteGroup } from '_INFServices/route'
import { faker } from '@faker-js/faker'

type TOverrides = {
  group: RouteGroup | string
  path?: string
}

export function makeRouteGroup(overrides?: TOverrides) {
  const group = overrides?.group || faker.person.jobDescriptor()
  const path = overrides?.path || faker.internet.domainWord()

  if (typeof group === 'string') {
    return RouteGroup.create(group, path)
  }

  return RouteGroup.create(group)
}
