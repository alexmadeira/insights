import z from 'zod'

import { ZMethod, ZMethodBody, ZMethodProps } from '.'

export const ZMethodPostProps = ZMethodProps.extend({
  body: ZMethodBody,
})

export const ZMethodPost = ZMethod.extend({})

//
//
//

export type TMethodPostProps = z.infer<typeof ZMethodPostProps>
export interface IMethodPost extends z.infer<typeof ZMethodPost> {}
