import type { HttpStatus } from '_COR/entities/value-objects/http-status'

import { ZEHttpResponseCode } from '@CORTypes/enums/http'
import z from 'zod'

export const ZBaseErrorProps = z.object({
  name: z.string(),
  type: z.string(),
  action: z.string(),
  code: z.union([ZEHttpResponseCode, z.number()]),
  cause: z.unknown().optional(),
})

export const ZBaseError = z.object({
  name: z.string(),
  type: z.string(),
  action: z.string(),
  message: z.string(),
  httpStatus: z.custom<HttpStatus>(),
  cause: z.unknown().optional(),
})

//
//
//

export type TBaseErrorProps = z.infer<typeof ZBaseErrorProps>
export interface IBaseError extends z.infer<typeof ZBaseError> {}
