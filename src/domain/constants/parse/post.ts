import type { TEPostStatus } from '@DOMTypes/enums/post'

export const postStatusName = {
  draft: 'rascunho',
  under_review: 'em revisão',
  changes_requested: 'alterações solicitadas',
  scheduled: 'agendado',
  published: 'publicado',
  updated: 'atualizado',
  archived: 'arquivado',
  deleted: 'deletado',
  featured: 'destaque',
  expired: 'expirado',
} as const satisfies Record<TEPostStatus, string>
