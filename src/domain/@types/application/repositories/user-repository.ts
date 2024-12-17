import type { User } from '_DOMEnt/entities/user'

import z from 'zod'

export const ZUserRepository = z.object({
  findById: z.function(z.tuple([z.string()])).returns(z.promise(z.custom<User>().nullable())),
  create: z.function(z.tuple([z.custom<User>()])).returns(z.promise(z.void())),
  save: z.function(z.tuple([z.custom<User>()])).returns(z.promise(z.void())),
  delete: z.function(z.tuple([z.custom<User>()])).returns(z.promise(z.void())),
})

//
//
//

export interface IUserRepository extends z.infer<typeof ZUserRepository> {}
