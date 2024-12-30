import type { TReferenceProps } from '_DOMEnt/entities/reference'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { REFERENCE_STATUS } from '_DOM/constants/reference'
import { Reference } from '_DOMEnt/entities/reference'
import { ReferenceStatus } from '_DOMEnt/entities/value-objects/reference-status'
import { faker } from '@faker-js/faker'

export function makeReference(overrides: Partial<TReferenceProps> = {}, id?: UniqueEntityID) {
  return Reference.create(
    {
      name: faker.person.fullName(),
      network: new UniqueEntityID(),
      status: new ReferenceStatus(faker.helpers.arrayElement(REFERENCE_STATUS)),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
