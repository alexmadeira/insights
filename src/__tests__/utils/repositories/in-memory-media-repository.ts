import type { MediaRepository } from '_DOM/application/repositories/media-repository'
import type { Media } from '_DOM/enterprise/entities/media'

export class InMemoryMediaRepository implements MediaRepository {
  public itens: Media[] = []

  async findById(mediaId: string) {
    const media = this.itens.find((item) => item.id.toString() === mediaId)

    if (!media) return null
    return media
  }

  async create(media: Media) {
    this.itens.push(media)

    return media
  }

  async save(media: Media) {
    const itemIndex = this.itens.findIndex((item) => item.id === media.id)
    this.itens[itemIndex] = media

    return media
  }

  async delete(media: Media) {
    const itemIndex = this.itens.findIndex((item) => item.id === media.id)
    this.itens.splice(itemIndex, 1)
  }
}
