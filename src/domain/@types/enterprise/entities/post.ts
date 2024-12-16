import z from 'zod'

export const ZReferenceProps = z.object({
  userName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZReference = z.object({
  userName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TReferenceProps = z.infer<typeof ZReferenceProps>
export interface IReference extends z.infer<typeof ZReference> {}
