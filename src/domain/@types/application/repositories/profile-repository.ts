import type { Profile } from '_DOMEnt/entities/profile'

import z from 'zod'

export const ZProfileRepository = z.object({
  findById: z.function(z.tuple([z.string()])).returns(z.promise(z.custom<Profile>().nullable())),
  create: z.function(z.tuple([z.custom<Profile>()])).returns(z.promise(z.void())),
  save: z.function(z.tuple([z.custom<Profile>()])).returns(z.promise(z.void())),
  delete: z.function(z.tuple([z.custom<Profile>()])).returns(z.promise(z.void())),
})

//
//
//

export interface IProfileRepository extends z.infer<typeof ZProfileRepository> {}
