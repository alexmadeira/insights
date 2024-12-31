import type { Media } from '_DOMEnt/entities/media'

export abstract class MediaRepository {
  abstract findById(id: string): Promise<Media | null>
  abstract create(avatar: Media): Promise<void>
  abstract save(avatar: Media): Promise<void>
  abstract delete(avatar: Media): Promise<void>
}
