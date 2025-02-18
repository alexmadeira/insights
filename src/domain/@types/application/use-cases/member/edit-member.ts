import type { Either } from '_COR/either'
import type { InvalidTypeError } from '_DOM/application/use-cases/_errors/invalid-type-error'
import type { ResourceNotFoundError } from '_DOM/application/use-cases/_errors/resource-not-found-error'
import type { Member } from '_DOM/enterprise/entities/member'

import z from 'zod'

export const ZEditMemberUseCaseRequest = z.object({
  memberId: z.string(),
  name: z.string(),
  email: z.string().email(),
  teamsIds: z.array(z.string()),
  avatarsIds: z.array(z.string()),
  companiesIds: z.array(z.string()),
})

export const ZEditMemberUseCaseResponse =
  z.custom<Either<InvalidTypeError | ResourceNotFoundError, { member: Member }>>()

export const ZEditMemberUseCase = z.object({
  execute: z.function(z.tuple([ZEditMemberUseCaseRequest])).returns(z.promise(ZEditMemberUseCaseResponse)),
})

//
//
//

export type TEditMemberUseCaseRequest = z.infer<typeof ZEditMemberUseCaseRequest>
export type TEditMemberUseCaseResponse = z.infer<typeof ZEditMemberUseCaseResponse>

export interface IEditMemberUseCase extends z.infer<typeof ZEditMemberUseCase> {}
