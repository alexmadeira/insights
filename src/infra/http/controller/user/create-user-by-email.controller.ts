import type { ICreateAvatarUseCase } from '@DOMTypes/application/use-cases/avatar/create-avatar'
import type { IController } from '@INFTypes/http/controller'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { createByEmailSchema } from '_INFHttp/schema/user/create-by-email'

export class CreateByEmailController implements IController {
  private readonly schema = createByEmailSchema

  constructor(private readonly createAvatarUseCase: ICreateAvatarUseCase) {
    this.handler = this.handler.bind(this)
  }

  public async handler(request: FastifyRequest, replay: FastifyReply) {
    const body = this.schema.getRequestBody(request)
    return replay.status(200).send(body)
  }
}
