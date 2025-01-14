import type { TMediaProps } from '_DOMEnt/entities/media'

import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { MEDIA_TYPE } from '_DOM/constants/media'
import { Media } from '_DOMEnt/entities/media'
import { MediaType } from '_DOMEnt/entities/value-objects'

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
