import type { Media } from '_DOM/enterprise/entities/media'

export interface MediaRepository {
  findById(id: string): Promise<Media | null>
  create(avatar: Media): Promise<Media>
  save(avatar: Media): Promise<Media>
  delete(avatar: Media): Promise<void>
}
