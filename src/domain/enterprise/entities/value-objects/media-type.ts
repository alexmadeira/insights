import type { TEMediaType } from '@DOMTypes/enums/media'

import { EnumValue } from '_COR/entities/value-objects/enum-value'
import { ZEMediaType } from '@DOMTypes/enums/media'

export class MediaType extends EnumValue<TEMediaType> {
  constructor(value: string) {
    super(value, ZEMediaType)
  }
}
