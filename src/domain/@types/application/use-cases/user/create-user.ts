import type { Either } from '_COR/either'
import type { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import type { User } from '_DOMEnt/entities/user'

import z from 'zod'

export const ZCreateUserUseCaseRequest = z.object({
  name: z.string(),
  role: z.string(),
  email: z.string().email(),
  teamId: z.string(),
  companyId: z.string(),
})

export const ZCreateUserUseCaseResponse = z.custom<Either<InvalidTypeError, { user: User }>>()

export const ZCreateUserUseCase = z.object({
  execute: z.function(z.tuple([ZCreateUserUseCaseRequest])).returns(z.promise(ZCreateUserUseCaseResponse)),
})

//
//
//

export type TCreateUserUseCaseRequest = z.infer<typeof ZCreateUserUseCaseRequest>
export type TCreateUserUseCaseResponse = z.infer<typeof ZCreateUserUseCaseResponse>

export interface ICreateUserUseCase extends z.infer<typeof ZCreateUserUseCase> {}
