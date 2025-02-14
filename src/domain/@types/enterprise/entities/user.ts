import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import z from 'zod'

export const ZUserProps = ZEntityProps.extend({
  name: z.string(),
  email: z.string().email(),
  hash: z.string(),
  indetifier: z.string(),
})

export const ZUser = ZEntity.extend({
  name: z.string(),
  email: z.string().email(),
  hash: z.string(),
  indetifier: z.string(),
})

//
//
//
export type TUserProps = z.infer<typeof ZUserProps>
export interface IUser extends z.infer<typeof ZUser> {}
