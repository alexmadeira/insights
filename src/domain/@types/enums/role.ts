import { ROLES } from '_DOM/constants/role'
import z from 'zod'

export const ZERole = z.enum(ROLES)

//
//
//

export type TERole = z.infer<typeof ZERole>
