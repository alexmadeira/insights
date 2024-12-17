import type { Company } from '_DOMEnt/entities/company'

import z from 'zod'

export const ZCompanyRepository = z.object({
  findById: z.function(z.tuple([z.string()])).returns(z.promise(z.custom<Company>().nullable())),
  create: z.function(z.tuple([z.custom<Company>()])).returns(z.promise(z.void())),
  save: z.function(z.tuple([z.custom<Company>()])).returns(z.promise(z.void())),
  delete: z.function(z.tuple([z.custom<Company>()])).returns(z.promise(z.void())),
})

//
//
//

export interface ICompanyRepository extends z.infer<typeof ZCompanyRepository> {}
