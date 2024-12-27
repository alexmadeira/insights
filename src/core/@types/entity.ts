import z from 'zod'

export const ZEntityProps = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const ZEntity = z.object({
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TEntityProps = z.infer<typeof ZEntityProps>
export interface IEntity extends z.infer<typeof ZEntity> {}
