import type { TReferenceProps } from '_DOM/enterprise/entities/reference'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { REFERENCE_STATUS } from '_DOM/constants/reference'
import { Reference } from '_DOM/enterprise/entities/reference'
import { ReferenceStatus } from '_DOM/enterprise/entities/value-objects'
import { faker } from '@faker-js/faker'

export function makeReference(overrides: Partial<TReferenceProps> = {}, id?: UniqueEntityID) {
  return Reference.create(
    {
      name: faker.person.fullName(),
      network: new UniqueEntityID(),
      status: new ReferenceStatus(faker.helpers.arrayElement(REFERENCE_STATUS)),
      ...overrides,
    },
    id,
  )
}
