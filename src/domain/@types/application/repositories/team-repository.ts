import type { Team } from '_DOMEnt/entities/team'

import z from 'zod'

export const ZTeamRepository = z.object({
  findById: z.function(z.tuple([z.string()])).returns(z.promise(z.custom<Team>().nullable())),
  create: z.function(z.tuple([z.custom<Team>()])).returns(z.promise(z.void())),
  save: z.function(z.tuple([z.custom<Team>()])).returns(z.promise(z.void())),
  delete: z.function(z.tuple([z.custom<Team>()])).returns(z.promise(z.void())),
})

//
//
//

export interface ITeamRepository extends z.infer<typeof ZTeamRepository> {}
