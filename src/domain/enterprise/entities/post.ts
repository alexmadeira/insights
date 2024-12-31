import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { IPost, TPostProps } from '@DOMTypes/enterprise/entities/post'

import { AggregateRoot } from '_COR/entities/aggregate-root'

import { PostMediaList } from './post-media-list'
import { PostStatus } from './value-objects'

export type * from '@DOMTypes/enterprise/entities/post'

export class Post extends AggregateRoot<TPostProps> implements IPost {
  static create(props: Optional<TPostProps, 'medias' | 'scheduledDate'>, id?: UniqueEntityID) {
    return new Post(
      {
        ...props,
        scheduledDate: props.scheduledDate ?? new Date(),
        medias: props.medias ?? new PostMediaList(),
      },
      id,
    )
  }

  public set title(title: string) {
    this._props.title = title
  }

  public set cover(cover: string) {
    this._props.cover = cover
  }

  public set likes(likes: number) {
    this._props.likes = likes
  }

  public set comments(comments: number) {
    this._props.comments = comments
  }

  public set deslikes(deslikes: number | undefined) {
    this._props.deslikes = deslikes
  }

  public set status(status: PostStatus) {
    this._props.status = status
  }

  public set medias(medias: PostMediaList) {
    this._props.medias = medias
  }

  public set description(description: string) {
    this._props.description = description
  }

  public set scheduledDate(scheduledDate: Date) {
    this._props.scheduledDate = scheduledDate
  }

  public get title() {
    return this._props.title
  }

  public get cover() {
    return this._props.cover
  }

  public get likes() {
    return this._props.likes
  }

  public get comments() {
    return this._props.comments
  }

  public get deslikes() {
    return this._props.deslikes
  }

  public get status() {
    return this._props.status
  }

  public get medias() {
    return this._props.medias
  }

  public get description() {
    return this._props.description
  }

  public get scheduledDate() {
    return this._props.scheduledDate
  }

  public get network() {
    return this._props.network
  }
}
