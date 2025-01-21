import z from 'zod'

import { ZMethod, ZMethodBody, ZMethodProps } from '.'

export const ZMethodPatchProps = ZMethodProps.extend({
  body: ZMethodBody,
})

export const ZMethodPatch = ZMethod.extend({})

//
//
//

export type TMethodPatchProps = z.infer<typeof ZMethodPatchProps>
export interface IMethodPatch extends z.infer<typeof ZMethodPatch> {}
