import z from 'zod'

import { ZMethod, ZMethodProps } from '.'

export const ZMethodDeleteProps = ZMethodProps.extend({
  body: z.undefined(),
})

export const ZMethodDelete = ZMethod.extend({})

//
//
//

export type TMethodDeleteProps = z.infer<typeof ZMethodDeleteProps>
export interface IMethodDelete extends z.infer<typeof ZMethodDelete> {}
