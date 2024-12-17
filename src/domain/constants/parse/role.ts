import type { TERole } from '@DOMTypes/enums/role'

export const roleName = {
  owner: 'proprietário',
  member: 'membro',
  'read-only': 'leitura',
  'billing-view': 'visualizar faturamento',
  'billing-admin': 'administrador de faturamento',
  'project-creator': 'criador de projeto',
} as const satisfies Record<TERole, string>
