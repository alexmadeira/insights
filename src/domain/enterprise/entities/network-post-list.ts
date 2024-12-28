import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { NetworkPost } from './network-post'

export class NetworkPostList extends WatchedList<NetworkPost> {
  compareItems(a: NetworkPost, b: NetworkPost): boolean {
    return a.postId.equals(b.postId)
  }

  static create(networkId: UniqueEntityID, postsIds: string[]) {
    return new NetworkPostList(
      postsIds.map((postId) => {
        return NetworkPost.create({
          networkId,
          postId: new UniqueEntityID(postId),
        })
      }),
    )
  }
}
