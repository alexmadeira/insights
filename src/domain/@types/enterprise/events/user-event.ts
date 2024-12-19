import type { User } from '_DOMEnt/entities/user'

import z from 'zod'

export const ZUserEventProps = z.object({
  user: z.custom<User>(),
  ocurredAt: z.date(),
})

//
//
//

export type TUserEventProps = z.infer<typeof ZUserEventProps>
