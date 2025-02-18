import type { TCompanyAvatarProps } from '_DOM/enterprise/entities/company-avatar'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CompanyAvatar } from '_DOM/enterprise/entities/company-avatar'

export function makeCompanyAvatar(overrides: Partial<TCompanyAvatarProps> = {}, id?: UniqueEntityID) {
  return CompanyAvatar.create(
    {
      companyId: new UniqueEntityID(),
      avatarId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
