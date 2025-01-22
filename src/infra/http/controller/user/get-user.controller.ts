import type { CompanyAvatarRepository } from '_DOMApp/repositories/company-avatar-repository'

import { FastifyReply, FastifyRequest, RouteHandler } from 'fastify'

export interface IController {
  handle: RouteHandler
}

export class GetUserController implements IController {
  constructor(private readonly companyAvatarRepository: CompanyAvatarRepository) {}

  public async handle(request: FastifyRequest, reply: FastifyReply) {
    console.log(request.body)
    reply.send('controller')
  }
}
