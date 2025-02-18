import type { ConnectionStatus } from '_DOM/enterprise/entities/value-objects'

import { ZEntity, ZEntityProps } from '@CORTypes/entity'
import { ZEConnectionAvailable } from '@DOMTypes/enums/connection'
import z from 'zod'

export const ZConnectionProps = ZEntityProps.extend({
  name: z.string(),
  code: ZEConnectionAvailable,
  status: z.custom<ConnectionStatus>(),
  token: z.string().optional(),
})

export const ZConnection = ZEntity.extend({
  name: z.string(),
  code: ZEConnectionAvailable,
  token: z.string().optional(),
  status: z.custom<ConnectionStatus>(),
})

//
//
//

export type TConnectionProps = z.infer<typeof ZConnectionProps>
export interface IConnection extends z.infer<typeof ZConnection> {}
