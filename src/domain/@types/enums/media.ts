import { MEDIA_TYPE } from '_DOM/constants/media'
import z from 'zod'

export const ZEMediaType = z.enum(MEDIA_TYPE)

//
//
//

export type TEMediaType = z.infer<typeof ZEMediaType>
