import { ZEHttpResponseCode } from '@CORTypes/enums/http'
import z from 'zod'

export const ZUseCaseErrorProps = z.object({
  name: z.string(),
  action: z.string(),
  code: z.union([ZEHttpResponseCode, z.number()]),
  cause: z.unknown().optional(),
})

export const ZUseCaseError = z.object({})

//
//
//

export type TUseCaseErrorProps = z.infer<typeof ZUseCaseErrorProps>
export interface IUseCaseError extends z.infer<typeof ZUseCaseError> {}
