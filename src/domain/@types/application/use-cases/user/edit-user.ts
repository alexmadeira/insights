import type { Either } from '_COR/either'
import type { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import type { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import type { User } from '_DOMEnt/entities/user'

import z from 'zod'

export const ZEditUserUseCaseRequest = z.object({
  userId: z.string(),
  name: z.string(),
  role: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().nullish(),
  teamsIds: z.array(z.string()),
  companyId: z.string(),
})

export const ZEditUserUseCaseResponse = z.custom<Either<InvalidTypeError | ResourceNotFoundError, { user: User }>>()

export const ZEditUserUseCase = z.object({
  execute: z.function(z.tuple([ZEditUserUseCaseRequest])).returns(z.promise(ZEditUserUseCaseResponse)),
})

//
//
//

export type TEditUserUseCaseRequest = z.infer<typeof ZEditUserUseCaseRequest>
export type TEditUserUseCaseResponse = z.infer<typeof ZEditUserUseCaseResponse>

export interface IEditUserUseCase extends z.infer<typeof ZEditUserUseCase> {}
