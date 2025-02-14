import type { Either } from '_COR/either'
import type { UserWrongCredentialsError } from '_DOMApp/use-cases/_errors/user-wrong-credentials-error'

import z from 'zod'

export const ZAuthenticateUserUseCaseRequest = z.object({
  password: z.string(),
  indetifier: z.string(),
})

export const ZAuthenticateUserUseCaseResponse = z.custom<Either<UserWrongCredentialsError, { accessToken: string }>>()

export const ZAuthenticateUserUseCase = z.object({
  execute: z.function(z.tuple([ZAuthenticateUserUseCaseRequest])).returns(z.promise(ZAuthenticateUserUseCaseResponse)),
})

//
//
//

export type TAuthenticateUserUseCaseRequest = z.infer<typeof ZAuthenticateUserUseCaseRequest>
export type TAuthenticateUserUseCaseResponse = z.infer<typeof ZAuthenticateUserUseCaseResponse>

export interface IAuthenticateUserUseCase extends z.infer<typeof ZAuthenticateUserUseCase> {}
