import z from 'zod'

import { ZMethod, ZMethodProps } from '.'

export const ZMethodGetProps = ZMethodProps.extend({
  body: z.undefined(),
})

export const ZMethodGet = ZMethod.extend({})

//
//
//

export type TMethodGetProps = z.infer<typeof ZMethodGetProps>
export interface IMethodGet extends z.infer<typeof ZMethodGet> {}
