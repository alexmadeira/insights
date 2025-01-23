import z from 'zod'

export const ZEntityProps = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().nullish(),
})

export const ZEntity = z.object({
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
})

//
//
//

export type TEntityProps = z.infer<typeof ZEntityProps>
export interface IEntity extends z.infer<typeof ZEntity> {}
