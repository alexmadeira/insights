import type { Either } from '_COR/either'
import type { Company } from '_DOMEnt/entities/company'

import z from 'zod'

export const ZCreateCompanyUseCaseRequest = z.object({
  name: z.string(),
  teamsIds: z.array(z.string()),
  membersIds: z.array(z.string()),
  profilesIds: z.array(z.string()),
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
