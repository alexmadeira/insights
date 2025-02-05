import type { ICreateAvatarUseCase } from '@DOMTypes/application/use-cases/avatar/create-avatar'
import type { IController } from '@INFTypes/http/controller'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { avatarCreateSchema } from '_INFHttp/schema/avatar-create'

export class CreateAvatarController implements IController {
  private readonly schema = avatarCreateSchema

  constructor(private readonly createAvatarUseCase: ICreateAvatarUseCase) {
    this.handler = this.handler.bind(this)
  }

  public async handler(request: FastifyRequest, replay: FastifyReply) {
    const query = this.schema.getRequestQuerystring(request)
    return replay.status(200).send(query)
  }
}
