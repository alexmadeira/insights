import type { Avatar } from '_DOMEnt/entities/avatar'

import z from 'zod'

export const ZAvatarRepository = z.object({
  findById: z.function(z.tuple([z.string()])).returns(z.promise(z.custom<Avatar>().nullable())),
  create: z.function(z.tuple([z.custom<Avatar>()])).returns(z.promise(z.void())),
  save: z.function(z.tuple([z.custom<Avatar>()])).returns(z.promise(z.void())),
  delete: z.function(z.tuple([z.custom<Avatar>()])).returns(z.promise(z.void())),
})

//
//
//

export interface IAvatarRepository extends z.infer<typeof ZAvatarRepository> {}
