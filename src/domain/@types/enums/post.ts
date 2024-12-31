import { POST_STATUS } from '_DOM/constants/post'
import z from 'zod'

export const ZEPostStatus = z.enum(POST_STATUS)

//
//
//

export type TEPostStatus = z.infer<typeof ZEPostStatus>
