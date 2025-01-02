import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'
import type { Company } from '_DOMEnt/entities/company'

import { ZERole } from '@DOMTypes/enums/role'
import z from 'zod'

export const ZEditCompanyUseCaseRequest = z.object({
  companyId: z.string(),
  name: z.string(),
  teamsIds: z.array(z.string()),
  avatarsIds: z.array(z.string()),
  profilesIds: z.array(z.string()),
  membersRoles: z.array(z.tuple([z.string(), ZERole])),
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
