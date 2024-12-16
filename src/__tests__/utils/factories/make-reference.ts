import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TReferenceProps } from '_DOMEnt/entities/reference'

import { REFERENCE_STATUS } from '_DOM/constants/reference'
import { Reference } from '_DOMEnt/entities/reference'
import { ReferenceStatus } from '_DOMEnt/entities/value-objects/reference-status'
import { faker } from '@faker-js/faker'

export function makeReference(overrides: Partial<TReferenceProps> = {}, id?: UniqueEntityID) {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return Reference.create(
    {
      name: `${firstName} ${lastName}`,
      status: ReferenceStatus.create(faker.helpers.arrayElement(REFERENCE_STATUS)),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
