import type { TEPostStatus } from '@DOMTypes/enums/post'

import { ZEPostStatus } from '@DOMTypes/enums/post'
import { EnumValue } from '_COR/entities/value-objects/enum-value'
import { postStatusName } from '_DOM/constants/parse/post'

export class PostStatus extends EnumValue<TEPostStatus> {
  constructor(value: string) {
    super(value, ZEPostStatus, postStatusName)
  }
}
