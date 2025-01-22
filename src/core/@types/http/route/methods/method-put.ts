import z from 'zod'

import { ZMethod, ZMethodBody, ZMethodProps } from '.'

export const ZMethodPutProps = ZMethodProps.extend({
  body: ZMethodBody,
  type: z.string().default('PUT'),
  path: z.string().default('/:id'),
  pathPrefix: z.string().default('/'),
})

export const ZMethodPut = ZMethod.extend({})

//
//
//

export type TMethodPutProps = z.infer<typeof ZMethodPutProps>
export interface IMethodPut extends z.infer<typeof ZMethodPut> {}
