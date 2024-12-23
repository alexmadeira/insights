import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import type { Company } from '_DOMEnt/entities/company'

import z from 'zod'

export const ZEditCompanyUseCaseRequest = z.object({
  companyId: z.string(),
  name: z.string(),
  avatarUrl: z.string().url().nullish(),
  ownerId: z.string(),
  teamsIds: z.array(z.string()),
  membersIds: z.array(z.string()),
  profilesIds: z.array(z.string()),
})

export const ZEditCompanyUseCaseResponse = z.custom<Either<ResourceNotFoundError, { company: Company }>>()

export const ZEditCompanyUseCase = z.object({
  execute: z.function(z.tuple([ZEditCompanyUseCaseRequest])).returns(z.promise(ZEditCompanyUseCaseResponse)),
})

//
//
//

export type TEditCompanyUseCaseRequest = z.infer<typeof ZEditCompanyUseCaseRequest>
export type TEditCompanyUseCaseResponse = z.infer<typeof ZEditCompanyUseCaseResponse>

export interface IEditCompanyUseCase extends z.infer<typeof ZEditCompanyUseCase> {}
