import { RouteGroup } from '_INF/services/route'
import { faker } from '@faker-js/faker'

export function makeRouteGroup(overridesName?: string, overridesPath?: string) {
  const name = overridesName ?? faker.person.jobDescriptor()
  const path = overridesPath ?? faker.internet.domainWord()

  return RouteGroup.create(name, path)
}
