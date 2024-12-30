import { NETWORK_TYPES } from '_DOM/constants/network'
import z from 'zod'

export const ZENetworkType = z.enum(NETWORK_TYPES)

//
//
//

export type TENetworkType = z.infer<typeof ZENetworkType>
