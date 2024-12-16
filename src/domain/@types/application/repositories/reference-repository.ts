import type { Reference } from '_DOMEnt/entities/reference'

import z from 'zod'

export const ZReferenceRepository = z.object({
  findById: z.function(z.tuple([z.string()])).returns(z.promise(z.custom<Reference>().nullable())),
  create: z.function(z.tuple([z.custom<Reference>()])).returns(z.promise(z.void())),
  save: z.function(z.tuple([z.custom<Reference>()])).returns(z.promise(z.void())),
})

//
//
//

export interface IReferenceRepository extends z.infer<typeof ZReferenceRepository> {}
