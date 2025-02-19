import type { IRegisterUserUseCase } from '@DOMTypes/application/use-cases/user/register-user'
import type { IController } from '@INFTypes/http/controller'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { registerByEmailSchema } from '_INF/http/schema/user'

export class RegisterByEmailController implements IController {
  private readonly schema = registerByEmailSchema

  constructor(private readonly registerUserUseCase: IRegisterUserUseCase) {}

  public async handler(request: FastifyRequest, replay: FastifyReply) {
    const body = this.schema.getRequestBody(request)

    const result = await this.registerUserUseCase.execute({
      name: body.name,
      email: body.email,
      password: body.password,
      indetifier: body.email,
    })

    if (result.isLeft()) throw new Error('Error')

    return replay.status(201).send()
  }
}
