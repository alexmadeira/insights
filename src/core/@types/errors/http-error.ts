import { ZEHttpResponseCode } from '@CORTypes/enums/http'
import z from 'zod'

export const ZHttpErrorProps = z.object({
  name: z.string(),
  action: z.string(),
  code: z.union([ZEHttpResponseCode, z.number()]),
  cause: z.unknown().optional(),
})

export const ZHttpError = z.object({})

//
//
//

export type THttpErrorProps = z.infer<typeof ZHttpErrorProps>
export interface IHttpError extends z.infer<typeof ZHttpError> {}
