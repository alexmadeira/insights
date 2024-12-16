import type { TEReferenceStatus } from '@DOMTypes/enums/reference'

import { referenceStatusName } from '_DOM/constants/name/reference'
import { ZEReferenceStatus } from '@DOMTypes/enums/reference'

import { Status } from './base/status'

export class ReferenceStatus extends Status<TEReferenceStatus> {
  static create(value: string) {
    return new ReferenceStatus(value, ZEReferenceStatus, referenceStatusName)
  }
}
