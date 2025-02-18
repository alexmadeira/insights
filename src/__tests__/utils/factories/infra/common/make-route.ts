import type { TRouteEditProps, TRouteGetProps, TRouteRemoveProps, TRouteSendProps } from '@INFTypes/services/route'

import { Route } from '_INF/services/route'
import { faker } from '@faker-js/faker'

import { mockController } from '../mock/mock-controller'
import { mockRequestSchema } from '../mock/mock-request-schema'

import { makeRouteGroup } from './make-route-group'

const requestSchema = mockRequestSchema()

export function makePostRoute(overrides: Partial<TRouteSendProps>) {
  return Route.post({
    routeGroup: makeRouteGroup(),
    groups: [faker.lorem.word()],
    summary: faker.lorem.sentence(),
    description: faker.lorem.sentence(10),
    operationId: faker.lorem.word(),
    path: faker.lorem.word(),
    ...requestSchema.routeSchema,
    controller: mockController,
    ...overrides,
  })
}
export function makeGetRoute(overrides: Partial<TRouteGetProps>) {
  return Route.get({
    routeGroup: makeRouteGroup(),
    groups: [faker.lorem.word()],
    summary: faker.lorem.sentence(),
    description: faker.lorem.sentence(10),
    operationId: faker.lorem.word(),
    path: faker.lorem.word(),
    controller: mockController,
    ...requestSchema.routeSchema,
    ...overrides,
  })
}

export function makePutRoute(overrides: Partial<TRouteEditProps>) {
  return Route.put({
    routeGroup: makeRouteGroup(),
    groups: [faker.lorem.word()],
    summary: faker.lorem.sentence(),
    description: faker.lorem.sentence(10),
    operationId: faker.lorem.word(),
    path: faker.lorem.word(),
    controller: mockController,
    ...requestSchema.routeSchema,
    ...overrides,
  })
}

export function makePatchRoute(overrides: Partial<TRouteEditProps>) {
  return Route.patch({
    routeGroup: makeRouteGroup(),
    groups: [faker.lorem.word()],
    summary: faker.lorem.sentence(),
    description: faker.lorem.sentence(10),
    operationId: faker.lorem.word(),
    path: faker.lorem.word(),
    controller: mockController,
    ...requestSchema.routeSchema,
    ...overrides,
  })
}
export function makeDeleteRoute(overrides: Partial<TRouteRemoveProps>) {
  return Route.delete({
    routeGroup: makeRouteGroup(),
    groups: [faker.lorem.word()],
    summary: faker.lorem.sentence(),
    description: faker.lorem.sentence(10),
    operationId: faker.lorem.word(),
    path: faker.lorem.word(),
    controller: mockController,
    ...requestSchema.routeSchema,
    ...overrides,
  })
}
