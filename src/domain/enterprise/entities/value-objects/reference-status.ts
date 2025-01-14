import type { TEReferenceStatus } from '@DOMTypes/enums/reference'

import { ZEReferenceStatus } from '@DOMTypes/enums/reference'
import { EnumValue } from '_COR/entities/value-objects/enum-value'
import { referenceStatusName } from '_DOM/constants/parse/reference'

export class ReferenceStatus extends EnumValue<TEReferenceStatus> {
  constructor(value: string) {
    super(value, ZEReferenceStatus, referenceStatusName)
  }
}
