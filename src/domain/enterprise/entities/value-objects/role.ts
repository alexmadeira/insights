import type { TERole } from '@DOMTypes/enums/role'

import { EnumValue } from '_COR/entities/value-objects/enum-value'
import { roleName } from '_DOM/constants/parse/role'
import { ZERole } from '@DOMTypes/enums/role'

export class Role extends EnumValue<TERole> {
  constructor(value: string) {
    super(value, ZERole, roleName)
  }
}
