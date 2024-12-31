import type { TPostMediaProps } from '_DOMEnt/entities/post-media'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { PostMedia } from '_DOMEnt/entities/post-media'

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
