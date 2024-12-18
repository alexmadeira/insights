import type { UserTeam } from '_DOMEnt/entities/user-team'

import z from 'zod'

export const ZUserTeamRepository = z.object({
  findManyByUserId: z.function(z.tuple([z.string()])).returns(z.promise(z.array(z.custom<UserTeam>()))),
  deleteManyByUserId: z.function(z.tuple([z.string()])).returns(z.promise(z.void())),
})

//
//
//

export interface IUserTeamRepository extends z.infer<typeof ZUserTeamRepository> {}
