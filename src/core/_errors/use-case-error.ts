import z from 'zod'

export const ZUseCaseError = z.object({
  message: z.string(),
})

//
//
//

export interface IUseCaseError extends z.infer<typeof ZUseCaseError> {}
