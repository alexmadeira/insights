import type { Either } from '_COR/either'
import type { InvalidTypeError } from '_DOM/application/use-cases/_errors/invalid-type-error'
import type { Member } from '_DOM/enterprise/entities/member'

import z from 'zod'

export const ZCreateMemberUseCaseRequest = z.object({
  name: z.string(),
  email: z.string().email(),
  teamsIds: z.array(z.string()),
  avatarsIds: z.array(z.string()),
  companiesIds: z.array(z.string()),
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
