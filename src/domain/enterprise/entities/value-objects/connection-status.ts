import type { TEConnectionStatus } from '@DOMTypes/enums/connection'

import { ZEConnectionStatus } from '@DOMTypes/enums/connection'
import { EnumValue } from '_COR/entities/value-objects'
import { connectionStatusName } from '_DOM/constants/parse/connection'

export class ConnectionStatus extends EnumValue<TEConnectionStatus> {
  constructor(value: string) {
    super(value, ZEConnectionStatus, connectionStatusName)
  }
}
