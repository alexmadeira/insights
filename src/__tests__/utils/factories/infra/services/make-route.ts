import type { TRouteEditProps, TRouteGetProps, TRouteRemoveProps, TRouteSendProps } from '@INFTypes/services/route'

import { Route } from '_INF/services/route'
import { faker } from '@faker-js/faker'

import { mockController } from '../mock/mock-controller'
import { mockPipe } from '../mock/mock-pipe'
import { mockRequestSchema } from '../mock/mock-request-schema'

const requestSchema = mockRequestSchema()

export function makePostRoute(overrides: Partial<TRouteSendProps> = {}) {
  return Route.post({
    tags: [faker.lorem.word()],
    summary: faker.lorem.sentence(),
    description: faker.lorem.sentence(10),
    operationId: faker.lorem.word(),
    path: faker.lorem.word(),
    pipes: [mockPipe],
    controller: mockController,
    ...requestSchema.routeSchema,
    ...overrides,
  })
}
export function makeGetRoute(overrides: Partial<TRouteGetProps> = {}) {
  return Route.get({
    tags: [faker.lorem.word()],
    summary: faker.lorem.sentence(),
    description: faker.lorem.sentence(10),
    operationId: faker.lorem.word(),
    path: faker.lorem.word(),
    pipes: [mockPipe],
    controller: mockController,
    ...requestSchema.routeSchema,
    ...overrides,
  })
}

export function makePutRoute(overrides: Partial<TRouteEditProps> = {}) {
  return Route.put({
    tags: [faker.lorem.word()],
    summary: faker.lorem.sentence(),
    description: faker.lorem.sentence(10),
    operationId: faker.lorem.word(),
    path: faker.lorem.word(),
    pipes: [mockPipe],
    controller: mockController,
    ...requestSchema.routeSchema,
    ...overrides,
  })
}

export function makePatchRoute(overrides: Partial<TRouteEditProps> = {}) {
  return Route.patch({
    tags: [faker.lorem.word()],
    summary: faker.lorem.sentence(),
    description: faker.lorem.sentence(10),
    operationId: faker.lorem.word(),
    path: faker.lorem.word(),
    pipes: [mockPipe],
    controller: mockController,
    ...requestSchema.routeSchema,
    ...overrides,
  })
}
export function makeDeleteRoute(overrides: Partial<TRouteRemoveProps> = {}) {
  return Route.delete({
    tags: [faker.lorem.word()],
    summary: faker.lorem.sentence(),
    description: faker.lorem.sentence(10),
    operationId: faker.lorem.word(),
    path: faker.lorem.word(),
    pipes: [mockPipe],
    controller: mockController,
    ...requestSchema.routeSchema,
    ...overrides,
  })
}

export function makeRoute(overrides: Partial<TRouteSendProps> = {}) {
  const route = faker.helpers.arrayElement([makePostRoute, makeGetRoute, makePutRoute, makePatchRoute, makeDeleteRoute])

  return route(overrides)
}
