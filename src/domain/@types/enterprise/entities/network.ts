import { NetworkStatus } from '_DOMEnt/entities/value-objects/network-status'
import z from 'zod'

export const ZNetworkProps = z.object({
  name: z.string(),
  userName: z.string(),
  status: z.custom<NetworkStatus>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZNetwork = z.object({
  name: z.string(),
  userName: z.string(),
  status: z.custom<NetworkStatus>(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TNetworkProps = z.infer<typeof ZNetworkProps>
export interface INetwork extends z.infer<typeof ZNetwork> {}
