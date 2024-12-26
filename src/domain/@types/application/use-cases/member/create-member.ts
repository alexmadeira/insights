import type { Either } from '_COR/either'
import type { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import type { Member } from '_DOMEnt/entities/member'

import z from 'zod'

export const ZCreateMemberUseCaseRequest = z.object({
  name: z.string(),
  email: z.string().email(),
  companiesIds: z.array(z.string()),
  teamsIds: z.array(z.string()),
})

export const ZCreateMemberUseCaseResponse = z.custom<Either<InvalidTypeError, { member: Member }>>()

export const ZCreateMemberUseCase = z.object({
  execute: z.function(z.tuple([ZCreateMemberUseCaseRequest])).returns(z.promise(ZCreateMemberUseCaseResponse)),
})

//
//
//

export type TCreateMemberUseCaseRequest = z.infer<typeof ZCreateMemberUseCaseRequest>
export type TCreateMemberUseCaseResponse = z.infer<typeof ZCreateMemberUseCaseResponse>

export interface ICreateMemberUseCase extends z.infer<typeof ZCreateMemberUseCase> {}
