import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import type { Post } from '_DOMEnt/entities/post'

import z from 'zod'

export const ZEditPostUseCaseRequest = z.object({
  postId: z.string(),
  title: z.string(),
  cover: z.string(),
  likes: z.number(),
  comments: z.number(),
  statusCode: z.string(),
  description: z.string(),
  mediasIds: z.array(z.string()),
  deslikes: z.number().optional(),
  scheduledDate: z.coerce.date().optional(),
})

export const ZEditPostUseCaseResponse = z.custom<Either<ResourceNotFoundError, { post: Post }>>()

export const ZEditPostUseCase = z.object({
  execute: z.function(z.tuple([ZEditPostUseCaseRequest])).returns(z.promise(ZEditPostUseCaseResponse)),
})

//
//
//

export type TEditPostUseCaseRequest = z.infer<typeof ZEditPostUseCaseRequest>
export type TEditPostUseCaseResponse = z.infer<typeof ZEditPostUseCaseResponse>

export interface IEditPostUseCase extends z.infer<typeof ZEditPostUseCase> {}
