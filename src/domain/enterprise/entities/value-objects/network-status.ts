import type { TENetworkStatus } from '@DOMTypes/enums/network'

import { networkStatusName } from '_DOM/constants/name/network'
import { ZENetworkStatus } from '@DOMTypes/enums/network'

export class NetworkStatus {
  private _value: string
  private readonly _code?: TENetworkStatus

  constructor(value: string) {
    this._value = value
    this._code = this.checkCode()
  }

  private checkCode() {
    const { success, data } = ZENetworkStatus.safeParse(this._value)

    if (success) return data
  }

  public get code() {
    return this._code
  }

  public get name() {
    if (!this._code) return
    return networkStatusName[this._code]
  }
}
