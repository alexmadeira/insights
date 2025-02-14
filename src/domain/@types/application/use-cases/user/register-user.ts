import type { Either } from '_COR/either'
import type { User } from '_DOMEnt/entities/user'

import z from 'zod'

export const ZRegisterUserUseCaseRequest = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  indetifier: z.string(),
})

export const ZRegisterUserUseCaseResponse = z.custom<Either<null, { user: User }>>()

export const ZRegisterUserUseCase = z.object({
  execute: z.function(z.tuple([ZRegisterUserUseCaseRequest])).returns(z.promise(ZRegisterUserUseCaseResponse)),
})

//
//
//

export type TRegisterUserUseCaseRequest = z.infer<typeof ZRegisterUserUseCaseRequest>
export type TRegisterUserUseCaseResponse = z.infer<typeof ZRegisterUserUseCaseResponse>

export interface IRegisterUserUseCase extends z.infer<typeof ZRegisterUserUseCase> {}
