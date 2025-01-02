import type { HttpStatus } from '_COR/entities/value-objects/http-status'

import z from 'zod'

export const ZUseCaseError = z.object({
  name: z.string(),
  message: z.string(),
  action: z.string(),
  code: z.custom<HttpStatus>(),
})

//
//
//

export interface IUseCaseError extends z.infer<typeof ZUseCaseError> {}
