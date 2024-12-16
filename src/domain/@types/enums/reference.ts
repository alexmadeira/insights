import { REFERENCE_STATUS } from '_DOM/constants/reference'
import z from 'zod'

export const ZEReferenceStatus = z.enum(REFERENCE_STATUS)

//
//
//

export type TEReferenceStatus = z.infer<typeof ZEReferenceStatus>
