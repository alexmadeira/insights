import { TEConnectionAvailable, TEConnectionStatus } from '@DOMTypes/enums/connection'

export const connectionStatusName = {
  connected: 'conectado',
  disconnected: 'desconectado',
  pending: 'pendente',
} as const satisfies Record<TEConnectionStatus, string>

export const connectionAvailableName = {
  facebook: 'Facebook',
  instagram: 'Instagram',
} as const satisfies Record<TEConnectionAvailable, string>
