import type { TENetworkType } from '@DOMTypes/enums/network'

import { ZENetworkType } from '@DOMTypes/enums/network'
import { EnumValue } from '_COR/entities/value-objects/enum-value'
import { networkTypeName } from '_DOM/constants/parse/network'

export class NetworkType extends EnumValue<TENetworkType> {
  constructor(value: string) {
    super(value, ZENetworkType, networkTypeName)
  }
}
