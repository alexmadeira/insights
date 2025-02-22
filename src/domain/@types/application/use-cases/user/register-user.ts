import type { Either } from '_COR/either'
import type { UserAlreadyExistisError } from '_DOM/application/use-cases/_errors/user-already-existis-error'
import type { User } from '_DOM/enterprise/entities/user'

import z from 'zod'

export const ZRegisterUserUseCaseRequest = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  indetifier: z.string(),
})

export const ZRegisterUserUseCaseResponse = z.custom<Either<UserAlreadyExistisError, { user: User }>>()

export const ZRegisterUserUseCase = z.object({
  execute: z.function(z.tuple([ZRegisterUserUseCaseRequest])).returns(z.promise(ZRegisterUserUseCaseResponse)),
})

//
//
//

export type TRegisterUserUseCaseRequest = z.infer<typeof ZRegisterUserUseCaseRequest>
export type TRegisterUserUseCaseResponse = z.infer<typeof ZRegisterUserUseCaseResponse>

export interface IRegisterUserUseCase extends z.infer<typeof ZRegisterUserUseCase> {}
