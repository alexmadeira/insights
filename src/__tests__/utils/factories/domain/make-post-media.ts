import type { TPostMediaProps } from '_DOM/enterprise/entities/post-media'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { PostMedia } from '_DOM/enterprise/entities/post-media'

export function makePostMedia(overrides: Partial<TPostMediaProps> = {}, id?: UniqueEntityID) {
  return PostMedia.create(
    {
      postId: new UniqueEntityID(),
      mediaId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
