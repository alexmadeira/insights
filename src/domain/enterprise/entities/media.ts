import type { IMedia, TMediaProps } from '@DOMTypes/enterprise/entities/media'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { MediaType } from './value-objects'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/media'

export class Media extends Entity<TMediaProps> implements IMedia {
  static create(props: TMediaProps, id?: UniqueEntityID) {
    return new Media(props, id)
  }

  public set url(url: string) {
    this._props.url = url
  }

  public set type(type: MediaType) {
    this._props.type = type
  }

  public get url() {
    return this._props.url
  }

  public get type() {
    return this._props.type
  }
}
