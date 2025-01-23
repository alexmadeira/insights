import type { MediaRepository } from '_DOMApp/repositories/media-repository'
import type { Media } from '_DOMEnt/entities/media'

export class PrismaMediaRepository implements MediaRepository {
  public itens: Media[] = []

  async findById(mediaId: string) {
    const media = this.itens.find((item) => item.id.toString() === mediaId)

    if (!media) return null
    return media
  }

  async create(media: Media) {
    this.itens.push(media)
  }

  async save(media: Media) {
    const itemIndex = this.itens.findIndex((item) => item.id === media.id)
    this.itens[itemIndex] = media
  }

  async delete(media: Media) {
    const itemIndex = this.itens.findIndex((item) => item.id === media.id)
    this.itens.splice(itemIndex, 1)
  }
}
