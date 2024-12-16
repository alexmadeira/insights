import type { Post } from '_DOMEnt/entities/post'

import z from 'zod'

export const ZPostRepository = z.object({
  findById: z.function(z.tuple([z.string()])).returns(z.promise(z.custom<Post>().nullable())),
  create: z.function(z.tuple([z.custom<Post>()])).returns(z.promise(z.void())),
  save: z.function(z.tuple([z.custom<Post>()])).returns(z.promise(z.void())),
})

//
//
//

export interface IPostRepository extends z.infer<typeof ZPostRepository> {}
