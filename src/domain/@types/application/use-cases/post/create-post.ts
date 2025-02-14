import type { Either } from '_COR/either'
import type { InvalidPostStatusError } from '_DOMApp/use-cases/_errors/invalid-post-status-error'
import type { Post } from '_DOMEnt/entities/post'

import z from 'zod'

export const ZCreatePostUseCaseRequest = z.object({
  title: z.string(),
  cover: z.string(),
  likes: z.number(),
  statusCode: z.string(),
  comments: z.number(),
  networkId: z.string(),
  description: z.string(),
  mediasIds: z.array(z.string()),
  scheduledDate: z.coerce.date().optional(),
  deslikes: z.number().optional(),
})

export const ZCreatePostUseCaseResponse = z.custom<Either<InvalidPostStatusError, { post: Post }>>()

export const ZCreatePostUseCase = z.object({
  execute: z.function(z.tuple([ZCreatePostUseCaseRequest])).returns(z.promise(ZCreatePostUseCaseResponse)),
})

//
//
//

export type TCreatePostUseCaseRequest = z.infer<typeof ZCreatePostUseCaseRequest>
export type TCreatePostUseCaseResponse = z.infer<typeof ZCreatePostUseCaseResponse>

export interface ICreatePostUseCase extends z.infer<typeof ZCreatePostUseCase> {}
