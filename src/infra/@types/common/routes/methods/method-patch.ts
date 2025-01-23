import z from 'zod'

import { ZMethod, ZMethodBody, ZMethodProps } from './method'

export const ZMethodPatchProps = ZMethodProps.extend({
  body: ZMethodBody,
  type: z.string().default('PATCH'),
  path: z.string().default('/:id'),
  pathPrefix: z.string().default('/'),
})

export const ZMethodPatch = ZMethod.extend({})

//
//
//

export type TMethodPatchProps = z.infer<typeof ZMethodPatchProps>
export interface IMethodPatch extends z.infer<typeof ZMethodPatch> {}
