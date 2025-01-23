import { IController } from '@INFTypes/http/controller'
import { FastifyReply, FastifyRequest } from 'fastify'

export abstract class Controller implements IController {
  protected constructor() {
    this.handle = this.handle.bind(this)
  }

  abstract handle(request: FastifyRequest, reply: FastifyReply): Promise<void>
}
