import { NETWORK_STATUS } from '_DOM/constants/network'
import z from 'zod'

export const ZENetworkStatus = z.enum(NETWORK_STATUS)

//
//
//

export type TENetworkStatus = z.infer<typeof ZENetworkStatus>
