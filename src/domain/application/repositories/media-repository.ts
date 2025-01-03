import type { Media } from '_DOMEnt/entities/media'

export interface MediaRepository {
  findById(id: string): Promise<Media | null>
  create(avatar: Media): Promise<void>
  save(avatar: Media): Promise<void>
  delete(avatar: Media): Promise<void>
}
