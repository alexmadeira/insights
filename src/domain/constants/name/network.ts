import type { TENetworkStatus } from '@DOMTypes/enums/network'

export const networkStatusName = {
  active: 'ativo',
  inactive: 'inativo',
} as const satisfies Record<TENetworkStatus, string>
