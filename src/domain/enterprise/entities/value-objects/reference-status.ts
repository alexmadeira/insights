import type { TEReferenceStatus } from '@DOMTypes/enums/reference'

import { EnumValue } from '_COR/entities/value-objects/enum-value'
import { referenceStatusName } from '_DOM/constants/parse/reference'
import { ZEReferenceStatus } from '@DOMTypes/enums/reference'

export class ReferenceStatus extends EnumValue<TEReferenceStatus> {
  static create(value: string) {
    return new ReferenceStatus(value, ZEReferenceStatus, referenceStatusName)
  }
}
