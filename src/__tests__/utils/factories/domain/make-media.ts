import type { TMediaProps } from '_DOM/enterprise/entities/media'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { MEDIA_TYPE } from '_DOM/constants/media'
import { Media } from '_DOM/enterprise/entities/media'
import { MediaType } from '_DOM/enterprise/entities/value-objects'
import { faker } from '@faker-js/faker'

export function makeMedia(overrides: Partial<TMediaProps> = {}, id?: UniqueEntityID) {
  return Media.create(
    {
      url: faker.image.url(),
      type: new MediaType(faker.helpers.arrayElement(MEDIA_TYPE)),
      ...overrides,
    },
    id,
  )
}
