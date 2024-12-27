import type { Either } from '_COR/either'
import type { Company } from '_DOMEnt/entities/company'

import { ZERole } from '@DOMTypes/enums/role'
import z from 'zod'

export const ZCreateCompanyUseCaseRequest = z.object({
  name: z.string(),
  teamsIds: z.array(z.string()),
  avatarsIds: z.array(z.string()),
  profilesIds: z.array(z.string()),
  membersRoles: z.array(z.tuple([z.string(), ZERole])),
})

export const ZCreateCompanyUseCaseResponse = z.custom<Either<null, { company: Company }>>()

export const ZCreateCompanyUseCase = z.object({
  execute: z.function(z.tuple([ZCreateCompanyUseCaseRequest])).returns(z.promise(ZCreateCompanyUseCaseResponse)),
})

//
//
//

export type TCreateCompanyUseCaseRequest = z.infer<typeof ZCreateCompanyUseCaseRequest>
export type TCreateCompanyUseCaseResponse = z.infer<typeof ZCreateCompanyUseCaseResponse>

export interface ICreateCompanyUseCase extends z.infer<typeof ZCreateCompanyUseCase> {}
