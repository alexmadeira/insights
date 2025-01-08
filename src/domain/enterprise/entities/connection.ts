import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { IConnection, TConnectionProps } from '@DOMTypes/enterprise/entities/connection'
import type { TEConnectionAvailable } from '@DOMTypes/enums/connection'

import { Entity } from '_COR/entities/entity'
import { connectionAvailableName } from '_DOM/constants/parse/connection'
import { Optional } from '@CORTypes/optional'

import { ConnectionStatus } from './value-objects'

export type * from '@DOMTypes/enterprise/entities/connection'

export class Connection extends Entity<TConnectionProps> implements IConnection {
  static create(props: Optional<TConnectionProps, 'name' | 'status'>, id?: UniqueEntityID) {
    return new Connection(
      {
        ...props,
        status: props.status ?? new ConnectionStatus('pending'),
        name: props.name ?? connectionAvailableName[props.code],
      },
      id,
    )
  }

  public set code(code: TEConnectionAvailable) {
    this._props.code = code
    this._props.name = connectionAvailableName[code]
  }

  public set status(status: ConnectionStatus) {
    this._props.status = status
  }

  public set token(token: string | undefined) {
    this._props.token = token
  }

  public get name() {
    return this._props.name
  }

  public get code() {
    return this._props.code
  }

  public get status() {
    return this._props.status
  }

  public get token() {
    return this._props.token
  }
}
