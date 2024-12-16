import type { TEReferenceStatus } from '@DOMTypes/enums/reference'

export const referenceStatusName = {
  active: 'ativo',
  inactive: 'inativo',
} as const satisfies Record<TEReferenceStatus, string>
