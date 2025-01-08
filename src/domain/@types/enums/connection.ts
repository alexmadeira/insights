import { CONNECTION_AVAILABLE, CONNECTION_STATUS } from '_DOM/constants/connection'
import z from 'zod'

export const ZEConnectionStatus = z.enum(CONNECTION_STATUS)
export const ZEConnectionAvailable = z.enum(CONNECTION_AVAILABLE)

//
//
//

export type TEConnectionStatus = z.infer<typeof ZEConnectionStatus>
export type TEConnectionAvailable = z.infer<typeof ZEConnectionAvailable>
