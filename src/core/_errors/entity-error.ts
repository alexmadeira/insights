import z from 'zod'

export const ZEntityError = z.object({
  message: z.string(),
})

//
//
//

export interface IEntityError extends z.infer<typeof ZEntityError> {}
