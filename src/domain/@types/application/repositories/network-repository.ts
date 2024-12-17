import type { Network } from '_DOMEnt/entities/network'

import z from 'zod'

export const ZNetworkRepository = z.object({
  findById: z.function(z.tuple([z.string()])).returns(z.promise(z.custom<Network>().nullable())),
  create: z.function(z.tuple([z.custom<Network>()])).returns(z.promise(z.void())),
  save: z.function(z.tuple([z.custom<Network>()])).returns(z.promise(z.void())),
  delete: z.function(z.tuple([z.custom<Network>()])).returns(z.promise(z.void())),
})

//
//
//

export interface INetworkRepository extends z.infer<typeof ZNetworkRepository> {}
