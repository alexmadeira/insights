import type { Either } from '_COR/either'
import type { Post } from '_DOMEnt/entities/post'

import z from 'zod'

export const ZCreatePostUseCaseRequest = z.object({
  title: z.string(),
})

export const ZCreatePostUseCaseResponse = z.custom<Either<null, { post: Post }>>()

export const ZCreatePostUseCase = z.object({
  execute: z.function(z.tuple([ZCreatePostUseCaseRequest])).returns(z.promise(ZCreatePostUseCaseResponse)),
})

//
//
//

export type TCreatePostUseCaseRequest = z.infer<typeof ZCreatePostUseCaseRequest>
export type TCreatePostUseCaseResponse = z.infer<typeof ZCreatePostUseCaseResponse>

export interface ICreatePostUseCase extends z.infer<typeof ZCreatePostUseCase> {}
