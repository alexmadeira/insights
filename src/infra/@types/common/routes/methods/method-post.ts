import z from 'zod'

import { ZMethod, ZMethodBody, ZMethodProps } from './method'

export const ZMethodPostProps = ZMethodProps.extend({
  body: ZMethodBody,
  type: z.string().default('POST'),
  path: z.string().default('/'),
  pathPrefix: z.string().default('/'),
})

export const ZMethodPost = ZMethod.extend({})

//
//
//

export type TMethodPostProps = z.infer<typeof ZMethodPostProps>
export interface IMethodPost extends z.infer<typeof ZMethodPost> {}
