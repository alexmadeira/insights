import type { TENetworkStatus } from '@DOMTypes/enums/network'

import { Status } from '_COR/entities/value-objects/status'
import { networkStatusName } from '_DOM/constants/name/network'
import { ZENetworkStatus } from '@DOMTypes/enums/network'

export class NetworkStatus extends Status<TENetworkStatus> {
  static create(value: string) {
    return new NetworkStatus(value, ZENetworkStatus, networkStatusName)
  }
}
