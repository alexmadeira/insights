import z from 'zod'

import { ZMethod, ZMethodProps } from './method'

export const ZMethodDeleteProps = ZMethodProps.extend({
  body: z.undefined(),
  type: z.string().default('DELETE'),
  path: z.string().default('/:id'),
  pathPrefix: z.string().default('/'),
})

export const ZMethodDelete = ZMethod.extend({})

//
//
//

export type TMethodDeleteProps = z.infer<typeof ZMethodDeleteProps>
export interface IMethodDelete extends z.infer<typeof ZMethodDelete> {}
