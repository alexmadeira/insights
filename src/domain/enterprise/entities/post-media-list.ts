import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { PostMedia } from './post-media'

export class PostMediaList extends WatchedList<PostMedia> {
  compareItems(a: PostMedia, b: PostMedia): boolean {
    return a.mediaId.equals(b.mediaId)
  }

  static create(postId: UniqueEntityID, mediasIds: string[]) {
    return new PostMediaList(
      mediasIds.map((mediaId) => {
        return PostMedia.create({
          postId,
          mediaId: new UniqueEntityID(mediaId),
        })
      }),
    )
  }
}
