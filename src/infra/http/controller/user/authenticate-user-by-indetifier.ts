import type { IAuthenticateUserUseCase } from '@DOMTypes/application/use-cases/user/authenticate-user'
import type { IController } from '@INFTypes/http/controller'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { authenticateByIndetifierSchema } from '_INFHttp/schema/user'

export class AuthenticateByIndetifierController implements IController {
  private readonly schema = authenticateByIndetifierSchema

  constructor(private readonly authenticateUserUseCase: IAuthenticateUserUseCase) {
    this.handler = this.handler.bind(this)
  }

  public async handler(request: FastifyRequest, replay: FastifyReply) {
    const body = this.schema.getRequestBody(request)

    const result = await this.authenticateUserUseCase.execute({
      indetifier: body.indetifier,
      password: body.password,
    })

    if (result.isLeft()) throw new Error('Error')

    return replay.status(202).send({ access_token: result.value.accessToken })
  }
}
