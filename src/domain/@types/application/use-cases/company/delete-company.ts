import type { Either } from '_COR/either'
import type { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'

import z from 'zod'

export const ZDeleteCompanyUseCaseRequest = z.object({
  companyId: z.string(),
})

export const ZDeleteCompanyUseCaseResponse = z.custom<Either<ResourceNotFoundError, null>>()

export const ZDeleteCompanyUseCase = z.object({
  execute: z.function(z.tuple([ZDeleteCompanyUseCaseRequest])).returns(z.promise(ZDeleteCompanyUseCaseResponse)),
})

//
//
//

export type TDeleteCompanyUseCaseRequest = z.infer<typeof ZDeleteCompanyUseCaseRequest>
export type TDeleteCompanyUseCaseResponse = z.infer<typeof ZDeleteCompanyUseCaseResponse>

export interface IDeleteCompanyUseCase extends z.infer<typeof ZDeleteCompanyUseCase> {}
