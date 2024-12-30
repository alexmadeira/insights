import type { TENetworkType } from '@DOMTypes/enums/network'

export const networkTypeName = {
  ig: 'instagram',
} as const satisfies Record<TENetworkType, string>
