import type { TERole } from '@DOMTypes/enums/role'

import { EnumValue } from '_COR/entities/value-objects/enum-value'
import { roleName } from '_DOM/constants/parse/role'
import { ZERole } from '@DOMTypes/enums/role'

export class Role extends EnumValue<TERole> {
  static create(value: string) {
    return new Role(value, ZERole, roleName)
  }
}
